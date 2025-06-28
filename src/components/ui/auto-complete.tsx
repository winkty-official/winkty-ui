"use client";

import type React from "react";
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming this utility exists
import { Button } from "@/components/ui/button"; // Assuming these components exist
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export type Option = {
  value: string;
  label: string;
  [key: string]: unknown; // Allow additional properties
};

type SingleSelectProps = {
  multiSelect?: false;
  value?: string | null; // Changed
  onChange?: (value: string | null) => void; // Changed
};

type MultiSelectProps = {
  multiSelect: true;
  value?: string[] | null; // Changed (allowing null for controlled clear)
  onChange?: (value: string[]) => void; // Changed (returns empty array for no selection)
};

type CommonProps = {
  options?: Option[];
  loadOptions?: (inputValue: string) => Promise<Option[]>;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  renderOption?: (option: Option) => React.ReactNode;
  filterOption?: (option: Option, inputValue: string) => boolean;
  name?: string;
  onBlur?: () => void;
  any?: boolean;
};

type AutocompleteProps = CommonProps & (SingleSelectProps | MultiSelectProps);

const __intialOptions: Option[] = [];

export default function Autocomplete({
  options: initialOptions = __intialOptions,
  value, // Now string | null or string[] | null
  onChange, // Now (string | null)=>void or (string[])=>void
  loadOptions,
  placeholder = "Select...",
  disabled = false,
  loading: externalLoading = false,
  error,
  className,
  size = "md",
  clearable = true,
  renderOption,
  filterOption,
  name,
  multiSelect = false,
  any = false,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [query, setQuery] = useState("");
  const [internalLoading, setInternalLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loading = externalLoading || internalLoading;

  useEffect(() => {
    if (!loadOptions) {
      setOptions(initialOptions);
    }
  }, [initialOptions, loadOptions]);

  const debouncedLoadOptions = useCallback(
    async (inputValue: string) => {
      if (loadOptions) {
        setInternalLoading(true);
        try {
          const newOptions = await loadOptions(inputValue);
          setOptions(newOptions);
        } catch (e) {
          console.error("Failed to load options:", e);
          setOptions(initialOptions); // Revert to initial or handle error state
        } finally {
          setInternalLoading(false);
        }
      }
    },
    [loadOptions, initialOptions], // Added initialOptions as a fallback
  );

  useEffect(() => {
    if (loadOptions && query) { // Only call if query is not empty for loadOptions
      const timer = setTimeout(() => {
        debouncedLoadOptions(query);
      }, 300);
      return () => clearTimeout(timer);
    } else if (!loadOptions) {
      // For non-async, options are already set by initialOptions
    } else {
      // If loadOptions is present but query is empty, maybe reset to initialOptions or show specific message
      setOptions(initialOptions);
    }
  }, [query, debouncedLoadOptions, loadOptions, initialOptions]);


  const filteredOptions = useMemo(() => {
    if (!query && !loadOptions) { // Show all options if query is empty and not using loadOptions
      return options;
    }
    return filterOption
      ? options.filter((option) => filterOption(option, query))
      : options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      );
  }, [options, query, filterOption, loadOptions]);


  const currentDisplayOptions = useMemo(() => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.length === 0) return [];

      return currentValues
        .map(valStr => {
          const foundOption = options.find(opt => opt.value === valStr);
          if (foundOption) return foundOption;
          if (any) return { value: valStr, label: valStr };
          return null;
        })
        .filter(Boolean) as Option[];
    } else {
      if (value && typeof value === 'string') {
        const foundOption = options.find(opt => opt.value === value);
        if (foundOption) return foundOption;
        if (any) return { value: value, label: value };
        return null;
      }
      return null;
    }
  }, [value, options, multiSelect, any]);

  const handleCustomValue = useCallback(() => {
    if (!query.trim()) return;
    const customVal = query.trim();

    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      if (!currentValues.includes(customVal)) {
        const newValue = [...currentValues, customVal];
        (onChange as (val: string[]) => void)?.(newValue);
      }
    } else {
      (onChange as (val: string | null) => void)?.(customVal);
      setOpen(false);
    }
    setQuery("");
  }, [query, multiSelect, value, onChange]);

  const handleSelect = useCallback(
    (optionToSelect: Option) => {
      if (multiSelect) {
        const currentValues = Array.isArray(value) ? value : [];
        const valueSet = new Set(currentValues);
        let newValue: string[];
        if (valueSet.has(optionToSelect.value)) {
          newValue = currentValues.filter(v => v !== optionToSelect.value);
        } else {
          newValue = [...currentValues, optionToSelect.value];
        }
        (onChange as (val: string[]) => void)?.(newValue);
      } else {
        (onChange as (val: string | null) => void)?.(optionToSelect.value);
        setOpen(false);
      }
      setQuery("");
    },
    [multiSelect, value, onChange],
  );

  const handleClear = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (multiSelect) {
        (onChange as (val: string[]) => void)?.([]);
      } else {
        (onChange as (val: string | null) => void)?.(null);
      }
      setQuery("");
      setOpen(false); // Close popover on clear
    },
    [onChange, multiSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && any && filteredOptions.length === 0 && query.trim()) {
        e.preventDefault();
        handleCustomValue();
      } else if (e.key === "Backspace" && query === "") {
        if (multiSelect && Array.isArray(value) && value.length > 0) {
          const newValue = value.slice(0, -1);
          (onChange as (val: string[]) => void)?.(newValue);
        } else if (!multiSelect && value !== null) {
          handleClear();
        }
      }
    },
    [any, filteredOptions.length, query, handleCustomValue, multiSelect, value, onChange, handleClear],
  );

  const handleRemoveOption = useCallback(
    (optionToRemove: Option) => {
      if (multiSelect && Array.isArray(value)) {
        const newValue = value.filter(v => v !== optionToRemove.value);
        (onChange as (val: string[]) => void)?.(newValue);
      }
    },
    [multiSelect, value, onChange],
  );

  const renderValueDisplay = () => {
    if (multiSelect) {
      const displayBadges = currentDisplayOptions as Option[] | null; // Will be Option[]
      return displayBadges && displayBadges.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1">
          {displayBadges.map((option) => (
            <Badge
              key={option.value}
              variant="secondary"
              className="mr-1 group-hover:border group-hover:border-primary"
            >
              {option.label}
              <button // Changed to button for better accessibility
                type="button"
                aria-label={`Remove ${option.label}`}
                className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveOption(option);
                }}
                onKeyDown={(e) => { // Keep for completeness, though click is primary for buttons
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    handleRemoveOption(option);
                  }
                }}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <span className="text-muted-foreground">{placeholder}</span>
      );
    }

    const displaySingle = currentDisplayOptions as Option | null;
    return displaySingle ? (
      <div className="flex items-center gap-2">
        {renderOption ? renderOption(displaySingle) : displaySingle.label}
      </div>
    ) : (
      <span className="text-muted-foreground">{placeholder}</span>
    );
  };

  const hasValue = multiSelect ? (Array.isArray(value) && value.length > 0) : (value !== null && value !== undefined);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between group",
              size === "sm" && "h-auto py-1.5 text-sm", // Adjusted padding for sm
              size === "md" && "h-10", // Standard h-10 for md
              size === "lg" && "h-11", // Standard h-11 for lg
              error && "border-destructive",
              className,
              !hasValue && "text-muted-foreground", // Style placeholder text
              "h-auto min-h-10" // Ensure it can grow with badges but has a min height
            )}
            disabled={disabled}
            onClick={() => !disabled && setOpen((prev) => !prev)} // Prevent open if disabled
          >
            <div className="flex-1 text-left overflow-hidden whitespace-nowrap">
              {renderValueDisplay()}
            </div>
            <div className="flex items-center self-stretch"> {/* Ensure icons align nicely */}
              {clearable && hasValue && !disabled && (
                <button // Changed to button for better accessibility
                  type="button"
                  aria-label="Clear selection"
                  className="mr-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100 focus:outline-none"
                  onClick={handleClear}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleClear(e as unknown as React.MouseEvent); // Keep for key interaction
                    }
                  }}
                >
                  <X />
                </button>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          style={{ width: buttonRef.current?.offsetWidth }} // Ensure content width matches trigger
          onOpenAutoFocus={(e) => e.preventDefault()} // Prevent auto-focus on first item, let input take focus
        >
          <Command>
            <CommandInput
              ref={inputRef}
              placeholder={placeholder} // Use consistent placeholder
              value={query}
              onValueChange={(newQuery) => {
                setQuery(newQuery);
                if (!open && newQuery) setOpen(true); // Open if typing when closed
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => !open && setOpen(true)} // Open on focus
            />
            <CommandList>
              <CommandEmpty>
                {loading ? null : (any && query.trim() ? ( // Don't show "add custom" if loading
                  <div className="p-2 text-sm text-center">
                    Press Enter to add &quot;{query}&quot;
                  </div>
                ) : (
                  "No results found."
                ))}
              </CommandEmpty>
              <CommandGroup className="max-h-60 overflow-auto">
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 text-center text-sm text-muted-foreground"
                  >
                    Loading...
                  </motion.div>
                ) : (
                  filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label} // Keep label for Command's internal filtering/navigation if needed
                      onSelect={() => handleSelect(option)}
                      className="flex items-center justify-between"
                      data-value={option.value} // Ensure value is available for testing/debugging
                    >
                      {renderOption ? renderOption(option) : option.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4", // Use ml-auto to push check to the right
                          (() => {
                            let isChecked = false;
                            if (multiSelect && Array.isArray(value)) {
                              isChecked = value.some(v => v === option.value);
                            } else {
                              isChecked = value === option.value;
                            }
                            return isChecked ? "opacity-100" : "opacity-0";
                          })()
                        )}
                      />
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive"
        >
          {error}
        </motion.p>
      )}
      {name && (
        <input
          type="hidden"
          name={name}
          value={
            multiSelect
              ? JSON.stringify(Array.isArray(value) ? value : [])
              : value ?? ""
          }
        />
      )}
    </div>
  );
}