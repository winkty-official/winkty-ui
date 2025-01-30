"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseAutocompleteProps, Option } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export function MultiSelectAutocomplete({
  options,
  onChange,
  placeholder = "Select...",
  disabled = false,
  loading = false,
  error,
  className,
  size = "md",
  maxItems,
}: BaseAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>([]);

  const handleSelect = useCallback(
    (option: Option) => {
      const isSelected = selected.some((item) => item.value === option.value);
      let newSelected: Option[];

      if (isSelected) {
        newSelected = selected.filter((item) => item.value !== option.value);
      } else if (!maxItems || selected.length < maxItems) {
        newSelected = [...selected, option];
      } else {
        return;
      }

      setSelected(newSelected);
      onChange?.(newSelected);
    },
    [selected, maxItems, onChange]
  );

  const handleRemove = useCallback(
    (optionToRemove: Option, e?: React.MouseEvent) => {
      e?.stopPropagation();
      const newSelected = selected.filter(
        (item) => item.value !== optionToRemove.value
      );
      setSelected(newSelected);
      onChange?.(newSelected);
    },
    [selected, onChange]
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
            <div className="flex flex-wrap gap-1">
              {selected.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                selected.map((item) => (
                  <Badge key={item.value} variant="secondary" className="mr-1">
                    {item.label}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRemove(item);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => handleRemove(item, e)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
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
                  options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => handleSelect(option)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected.some((item) => item.value === option.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
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
