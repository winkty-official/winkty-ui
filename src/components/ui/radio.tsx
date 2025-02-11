"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as RadioGroup from "@radix-ui/react-radio-group";
import React from "react";

// Define types for radio items
export interface RadioItem {
  id: string | number;
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface AreaRadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroup.Root> {
  error?: boolean;
  helperText?: string;
  className?: string;
}

export interface RadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroup.Item> {
  value: string;
  RadioGroupContainerProps?: React.HTMLProps<HTMLDivElement>;
  children: React.ReactNode;
  // indicatorType?: "border" | "check" | "radio";
  // radioPosition?: "left" | "right";
  indicator?: React.ReactNode;
  indicatorPosition?: "left" | "right";
}

const RadioItem = React.forwardRef<HTMLButtonElement, RadioItemProps>(
  (
    {
      value,
      children,
      className,
      indicator,
      indicatorPosition = "left",
      ...itemProps
    },
    ref
  ) => {
    return (
      <RadioGroup.Item
        ref={ref}
        value={value}
        className={cn(
          "group peer w-full",
          "relative rounded-lg border border-input bg-background shadow-sm transition-all duration-150",
          "hover:bg-muted/50",
          "group-data-[state=checked]:border-primary group-data-[state=checked]:bg-primary/5",
          "group-data-[state=checked]:ring-2 group-data-[state=checked]:ring-primary/10",
          className
        )}
        {...itemProps}
      >
        <Label
          htmlFor={value}
          className="flex w-full cursor-pointer items-start p-4"
        >
          {indicatorPosition === "left" && (
            <div className="flex h-full items-center pr-2">
              {indicator ? (
                <div className=" opacity-0 group-data-[state=checked]:opacity-100">
                  {indicator}
                </div>
              ) : (
                <div className="h-4 w-4 rounded-full border border-primary bg-background transition-colors group-data-[state=checked]:bg-primary">
                  <RadioGroup.Indicator className="flex h-full w-full items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </RadioGroup.Indicator>
                </div>
              )}
            </div>
          )}
          <div className="flex grow">{children}</div>
          {indicatorPosition === "right" && (
            <div className="flex h-full items-center pl-2">
              {indicator ? (
                <div className=" opacity-0 group-data-[state=checked]:opacity-100">
                  {indicator}
                </div>
              ) : (
                <div className="h-4 w-4 rounded-full border border-primary bg-background transition-colors group-data-[state=checked]:bg-primary">
                  <RadioGroup.Indicator className="flex h-full w-full items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </RadioGroup.Indicator>
                </div>
              )}
            </div>
          )}
        </Label>
      </RadioGroup.Item>
    );
  }
);

RadioItem.displayName = "RadioItem";

const AreaRadioGroup = React.forwardRef<HTMLDivElement, AreaRadioGroupProps>(
  (
    {
      defaultValue,
      name,
      onValueChange,
      error,
      helperText,
      required,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <RadioGroup.Root
          ref={ref}
          defaultValue={defaultValue}
          name={name}
          onValueChange={onValueChange}
          className={cn("flex flex-col gap-2", className)}
          required={required}
          {...props}
        >
          {children}
        </RadioGroup.Root>
        {helperText && (
          <p
            className={cn(
              "text-sm mt-2",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </>
    );
  }
);

AreaRadioGroup.displayName = "AreaRadioGroup";

export { RadioItem };
export default AreaRadioGroup;
