"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { AlertCircle } from "lucide-react";

const inputFieldVariants = cva(
  [
    "flex h-10 w-full rounded-sm bg-background px-3 py-2 text-sm ring-offset-background",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
    "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 ",
    "disabled:cursor-not-allowed disabled:opacity-50 ",
    "[data-error='true'] ",
  ],
  {
    variants: {
      variant: {
        default: "border border-input",
        outline: "border border-input bg-transparent",
        ghost: "border-none bg-transparent shadow-none",
        "outline-bottom": "border-b border-input bg-transparent",
      },
      inputSize: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
      state: {
        default: "focus-visible:ring-ring",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-success focus-visible:ring-success",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      state: "default",
    },
  }
);

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputFieldVariants> {
  wrapperClassName?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  success?: boolean;
  InputProps?: {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    style?: React.CSSProperties;
  };
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      wrapperClassName,
      type = "text",
      label,
      helperText,
      error,
      success,
      variant,
      inputSize,
      InputProps,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputState = error ? "error" : success ? "success" : "default";

    return (
      <div
        className={cn(
          "flex flex-col w-full space-y-1.5",
          disabled && "opacity-50",
          wrapperClassName
        )}
        data-error={error}
        data-success={success}
        data-disabled={disabled}
      >
        {label && (
          <label
            className={cn(
              "text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              error && "text-destructive"
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {InputProps?.startAdornment && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {InputProps.startAdornment}
            </div>
          )}
          <input
            {...props}
            type={type}
            className={cn(
              inputFieldVariants({ variant, inputSize, state: inputState }),
              InputProps?.startAdornment && "pl-10",
              InputProps?.endAdornment && "pr-10",
              props?.className
            )}
            ref={ref}
            aria-invalid={error}
            aria-describedby={
              helperText ? `${props.id}-description` : undefined
            }
            disabled={disabled}
            required={required}
            style={InputProps?.style}
          />
          {InputProps?.endAdornment && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {InputProps.endAdornment}
            </div>
          )}
          {error && !InputProps?.endAdornment && (
            <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
          )}
        </div>
        {helperText && (
          <p
            id={`${props.id}-description`}
            className={cn(
              "text-xs",
              error
                ? "text-destructive"
                : success
                ? "text-success"
                : "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
