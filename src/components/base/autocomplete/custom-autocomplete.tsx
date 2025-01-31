"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomAutocompleteProps, Option } from "./types";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CustomAutocomplete({
  options = [], // Provide default empty array
  onChange,
  placeholder = "Select...",
  disabled = false,
  loading = false,
  error,
  className,
  size = "md",
  renderOption,
  filterOption,
}: CustomAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const [query, setQuery] = useState("");

  const filteredOptions = filterOption
    ? options.filter((option) => filterOption(option, query))
    : options.filter((option) =>
        // Safely handle potentially undefined labels
        (option.label || "").toLowerCase().includes((query || "").toLowerCase())
      );

  const handleSelect = useCallback(
    (option: Option) => {
      setSelected(option);
      setOpen(false);
      onChange?.(option);
    },
    [onChange]
  );

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
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
            {selected ? (
              <div className="flex items-center gap-2">
                {renderOption(selected)}
              </div>
            ) : (
              placeholder
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={query}
              onValueChange={setQuery}
            />
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
                      {renderOption(option)}
                      <Check
                        className={cn(
                          "ml-2 h-4 w-4",
                          selected?.value === option.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
                )}
              </AnimatePresence>
            </CommandGroup>
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
    </div>
  );
}
