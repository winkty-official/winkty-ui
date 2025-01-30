"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { BaseAutocompleteProps, Option } from "./types"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SearchableAutocompleteProps extends BaseAutocompleteProps {
  onSearch?: (query: string) => void
}

export function SearchableAutocomplete({
  options,
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
  loading = false,
  error,
  className,
  size = "md",
  clearable = true,
  onSearch,
}: SearchableAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Option | null>(null)
  const [query, setQuery] = useState("")

  const filteredOptions = useMemo(() => {
    if (!query) return options
    const lowerQuery = query.toLowerCase()
    return options.filter((option) =>
      option.label.toLowerCase().includes(lowerQuery)
    )
  }, [options, query])

  const handleSelect = useCallback((option: Option) => {
    setSelected(option)
    setOpen(false)
    onChange?.(option)
  }, [onChange])

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
    onSearch?.(value)
  }, [onSearch])

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
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 shrink-0 opacity-50" />
              {selected?.label || placeholder}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={query}
              onValueChange={handleSearch}
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
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected?.value === option.value
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
  )
}