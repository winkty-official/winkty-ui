"use client";

import type React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  value?: Option | null;
  onChange?: (value: Option | null) => void;
};

type MultiSelectProps = {
  multiSelect: true;
  value?: Option[] | null;
  onChange?: (value: Option[] | null) => void;
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

export default function Autocomplete({
  options: initialOptions = [],
  value,
  onChange,
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
  any = false, // Default to false to maintain backward compatibility
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
        const newOptions = await loadOptions(inputValue);
        setOptions(newOptions);
        setInternalLoading(false);
      }
    },
    [loadOptions],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedLoadOptions(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, debouncedLoadOptions]);

  const filteredOptions = filterOption
    ? options.filter((option) => filterOption(option, query))
    : options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      );

  const handleCustomValue = useCallback(() => {
    if (!query.trim()) return;

    const customOption: Option = {
      value: query,
      label: query,
    };

    if (multiSelect) {
      const newValue = Array.isArray(value) ? [...value] : [];
      newValue.push(customOption);
      onChange?.(newValue as Option & Option[]);
    } else {
      onChange?.(customOption as Option & Option[]);
      setOpen(false);
    }
    setQuery("");
  }, [query, multiSelect, value, onChange]);

  const handleSelect = useCallback(
    (option: Option) => {
      if (multiSelect) {
        const newValue = Array.isArray(value) ? [...value] : [];
        const optionIndex = newValue.findIndex(
          (item) => item.value === option.value,
        );
        if (optionIndex > -1) {
          newValue.splice(optionIndex, 1);
        } else {
          newValue.push(option);
        }
        onChange?.(newValue as Option & Option[]);
      } else {
        setOpen(false);
        onChange?.(option as Option & Option[]);
      }
      setQuery("");
    },
    [multiSelect, value, onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        any &&
        filteredOptions.length === 0 &&
        query.trim()
      ) {
        e.preventDefault();
        handleCustomValue();
      } else if (e.key === "Backspace" && query === "") {
        if (multiSelect && Array.isArray(value) && value.length > 0) {
          const newValue = value.slice(0, -1);
          // onChange?.(newValue);
          // if (newValue.length === 0) {
          //   onChange?.(null as unknown as Option & Option[]);
          // } else {
          onChange?.(newValue as Option & Option[]);
          // }
        } else if (!multiSelect) {
          handleClear();
        }
      }
    },
    [any, filteredOptions.length, query, handleCustomValue],
  );

  const handleClear = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      onChange?.(null as unknown as Option & Option[]);
      setQuery("");
    },
    [onChange, multiSelect],
  );

  const handleRemoveOption = useCallback(
    (optionToRemove: Option) => {
      console.log(optionToRemove);
      if (multiSelect && Array.isArray(value)) {
        const newValue = value.filter(
          (option) => option.value !== optionToRemove.value,
        );
        // if (newValue.length === 0) {
        //   onChange?.(null as unknown as Option & Option[]);
        // } else {
        onChange?.(newValue as Option & Option[]);
        // }
      }
    },
    [multiSelect, value, onChange],
  );

  const renderValue = () => {
    if (multiSelect && Array.isArray(value)) {
      return value.length ? (
        <div className="flex flex-wrap gap-1">
          {value.map((option) => (
            <Badge
              key={option.value}
              variant="secondary"
              className="mr-1 group-hover:border group-hover:border-primary"
            >
              {option.label}
              <div
                role="button"
                tabIndex={0}
                className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveOption(option);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    handleRemoveOption(option);
                  }
                }}
              >
                <X className="h-3 w-3 hover:text-primary" />
              </div>
            </Badge>
          ))}
        </div>
      ) : (
        placeholder
      );
    }
    return value ? (
      <div className="flex items-center gap-2">
        {renderOption ? renderOption(value as Option) : (value as Option).label}
      </div>
    ) : (
      placeholder
    );
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="h-auto">
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between group",
              size === "sm" && "h-auto text-sm",
              size === "lg" && "h-auto",
              error && "border-destructive",
              className,
            )}
            disabled={disabled}
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="flex flex-wrap items-center gap-1 overflow-hidden">
              {renderValue()}
            </div>
            <div className="flex items-center">
              {clearable && value && (
                <div
                  role="button"
                  tabIndex={0}
                  className="mr-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100 focus:outline-none"
                  onClick={handleClear}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleClear(e as unknown as React.MouseEvent);
                    }
                  }}
                >
                  <X />
                </div>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput
              ref={inputRef}
              placeholder={placeholder}
              value={query}
              onValueChange={setQuery}
              onKeyDown={handleKeyDown}
            />
            <CommandList>
              <CommandEmpty>
                {any ? (
                  <div className="p-2 text-sm">
                    Press Enter to add "{query}" as a custom value
                  </div>
                ) : (
                  "No results found."
                )}
              </CommandEmpty>
              <CommandGroup className="max-h-60 overflow-auto">
                <AnimatePresence mode="wait">
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
                        value={option.label}
                        onSelect={() => handleSelect(option)}
                        className="flex items-center justify-between"
                      >
                        {renderOption ? renderOption(option) : option.label}
                        <Check
                          className={cn(
                            "ml-2 h-4 w-4",
                            multiSelect && Array.isArray(value)
                              ? value.some(
                                  (item) => item.value === option.value,
                                )
                                ? "opacity-100"
                                : "opacity-0"
                              : (value as Option)?.value === option.value
                                ? "opacity-100"
                                : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))
                  )}
                </AnimatePresence>
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
            multiSelect ? JSON.stringify(value) : (value as Option)?.value || ""
          }
        />
      )}
    </div>
  );
}
