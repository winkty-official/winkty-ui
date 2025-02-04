"use client";

import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronsUpDown, X } from "lucide-react";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import type { Option } from "./normal-autocomplete";

type MultiAutocompleteProps = {
  options?: Option[];
  value: Option[];
  onChange?: (value: Option[]) => void;
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
};

export function MultiAutocomplete({
  // options: initialOptions = [],
  value,
  onChange,
  // loadOptions,
  placeholder = "Select...",
  disabled = false,
  loading: externalLoading = false,
  error,
  className,
  size = "md",
  clearable = true,
  renderOption,
  // filterOption,
  name,
}: MultiAutocompleteProps) {
  const [open, setOpen] = useState(false);
  // const [options, setOptions] = useState<Option[]>(initialOptions);
  const [query, setQuery] = useState("");
  const [internalLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const loading = externalLoading || internalLoading;

  // ...reuse existing loadOptions and filter logic...

  const handleSelect = useCallback(
    (option: Option) => {
      const newValue = [...value];
      const optionIndex = newValue.findIndex(
        (item) => item.value === option.value
      );

      if (optionIndex > -1) {
        newValue.splice(optionIndex, 1);
      } else {
        newValue.push(option);
      }

      onChange?.(newValue);
    },
    [value, onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.([]);
    },
    [onChange]
  );

  const handleRemoveOption = useCallback(
    (optionToRemove: Option) => {
      const newValue = value.filter(
        (option) => option.value !== optionToRemove.value
      );
      onChange?.(newValue);
    },
    [value, onChange]
  );

  const renderValue = () => (
    <div className="flex flex-wrap gap-1">
      {value.map((option) => (
        <Badge key={option.value} variant="secondary" className="mr-1">
          {option.label}
          <button
            className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveOption(option);
            }}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      {value.length === 0 && placeholder}
    </div>
  );

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              size === "sm" && "h-8 text-sm",
              size === "lg" && "h-12",
              error && "border-destructive",
              className
            )}
            disabled={disabled}
          >
            <div className="flex flex-wrap items-center gap-1 overflow-hidden">
              {renderValue()}
            </div>
            <div className="flex items-center">
              {clearable && value.length > 0 && (
                <X
                  className="mr-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                  onClick={handleClear}
                />
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
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
                            value.some((item) => item.value === option.value)
                              ? "opacity-100"
                              : "opacity-0"
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
          value={JSON.stringify(value.map((v) => v.value))}
        />
      )}
    </div>
  );
}
