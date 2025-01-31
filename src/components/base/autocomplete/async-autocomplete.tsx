"use client";
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
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AsyncAutocompleteProps, Option } from "./types";

export function AsyncAutocomplete({
  loadOptions,
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
  error,
  className,
  size = "md",
  clearable = true,
  debounceMs = 300,
  name,
  onBlur,
}: AsyncAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const debouncedQuery = useDebounce(query, debounceMs);

  useEffect(() => {
    async function fetchOptions() {
      if (!debouncedQuery) {
        setOptions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await loadOptions(debouncedQuery);
        setOptions(results || []);
      } catch (error) {
        console.error("Failed to load options:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOptions();
  }, [debouncedQuery, loadOptions]);

  const handleSelect = useCallback(
    (currentValue: string) => {
      const selected = options.find((option) => option.label === currentValue);
      onChange?.(selected || null);
      setOpen(false);
      onBlur?.(); // Trigger onBlur for form validation
    },
    [onChange, options, onBlur]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
      setQuery("");
      onBlur?.();
    },
    [onChange, onBlur]
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
            name={name}
            onBlur={onBlur}
            type="button" // Prevent form submission
          >
            <span className="truncate">{value?.label || placeholder}</span>
            <div className="flex items-center gap-1">
              {clearable && value && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-muted"
                  onClick={handleClear}
                  type="button"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Clear</span>
                </Button>
              )}
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={placeholder}
              value={query}
              onValueChange={setQuery}
            />
            <CommandEmpty>
              {loading ? "Loading..." : "No results found."}
            </CommandEmpty>
            <CommandGroup className="max-h-60 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.value === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
