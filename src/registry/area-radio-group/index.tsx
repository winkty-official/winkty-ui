import * as React from "react";
import { RadioGroup } from "@/components/ui/radio-group";

// Types
export interface RadioItem {
  id: string | number;
  value: string;
  label: string;
  description?: string;
  imageUrl?: string;
  disabled?: boolean;
}

export interface AreaRadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroup> {
  items: RadioItem[];
  defaultValue?: string;
  name?: string;
  orientation?: "horizontal" | "vertical";
  onValueChange?: (value: string) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  className?: string;
}

// Component code...
