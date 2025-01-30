import { ReactNode } from "react";

export interface Option {
  label: string;
  value: string | number;
  [key: string]: any;
}

export interface BaseAutocompleteProps {
  options: Option[];
  value?: Option | Option[] | null;
  onChange?: (value: Option | Option[] | null) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  className?: string;
  multiple?: boolean;
  searchable?: boolean;
  maxItems?: number;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
}

export interface AsyncAutocompleteProps {
  loadOptions: (query: string) => Promise<Option[]>;
  value: Option | null;
  onChange?: (option: Option | null) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  debounceMs?: number;
  name?: string;
  onBlur?: () => void;
}

export interface CustomAutocompleteProps extends BaseAutocompleteProps {
  renderOption: (option: Option) => ReactNode;
  filterOption?: (option: Option, query: string) => boolean;
}
