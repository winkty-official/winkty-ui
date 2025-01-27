"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import Image from "next/image";
import { Label } from "@/components/ui/label";

// Define types for radio items
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

export interface RadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  value: string;
  RadioGroupContainerProps?: React.HTMLProps<HTMLDivElement>;
  children: React.ReactNode;
}

const RadioItem = React.forwardRef<HTMLDivElement, RadioItemProps>(
  (
    { value, RadioGroupContainerProps, children, className, ...itemProps },
    ref
  ) => {
    const { className: containerClassName, ...containerProps } =
      RadioGroupContainerProps || {};

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 transition-colors",
          "has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5",
          "hover:bg-muted/50",
          containerClassName
        )}
        {...containerProps}
      >
        <RadioGroupItem
          value={value}
          id={value}
          aria-describedby={`${value}-description`}
          className={cn("after:absolute after:inset-0", className)}
          {...itemProps}
        />
        <div className="flex grow items-start gap-3">{children}</div>
      </div>
    );
  }
);

RadioItem.displayName = "RadioItem";

const AreaRadioGroup = React.forwardRef<HTMLDivElement, AreaRadioGroupProps>(
  (
    {
      items,
      defaultValue,
      name,
      orientation = "vertical",
      onValueChange,
      error,
      helperText,
      required,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        <RadioGroup
          defaultValue={defaultValue}
          name={name}
          onValueChange={onValueChange}
          className={cn(
            "space-y-2",
            orientation === "horizontal" && "flex space-x-2 space-y-0"
          )}
          required={required}
          {...props}
        >
          {items?.map((item) => (
            <RadioItem
              key={item.id}
              value={item.value}
              disabled={item.disabled}
              className={cn(error && "border-destructive")}
            >
              <div className="flex items-center space-x-3">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.label}
                    width={32}
                    height={24}
                    className="shrink-0 rounded object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <Label
                    htmlFor={item.value}
                    className={cn(
                      item.disabled && "opacity-50",
                      error && "text-destructive"
                    )}
                  >
                    {item.label}
                  </Label>
                  {item.description && (
                    <p
                      id={`${item.value}-description`}
                      className={cn(
                        "text-sm text-muted-foreground",
                        item.disabled && "opacity-50"
                      )}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </RadioItem>
          ))}
        </RadioGroup>
        {helperText && (
          <p
            className={cn(
              "text-sm",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AreaRadioGroup.displayName = "AreaRadioGroup";

export default AreaRadioGroup;
