import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AreaRadioGroup from "@/components/base/radio/area-radio-group";
import { Terminal, Package, FileCode2 } from "lucide-react";
import { CodeBlock } from "@/components/home/code-block";
import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import { ManualInstall } from "@/components/base/radio/manual-install";

export const metadata: Metadata = {
  title: "Area Radio Group - UI Components",
  description:
    "A flexible and accessible radio group component with rich content support.",
};

const installCode = {
  npm: "npm install @yourlibrary/area-radio-group",
  pnpm: "pnpm add @yourlibrary/area-radio-group",
  yarn: "yarn add @yourlibrary/area-radio-group",
};

const cliInstallCode = `npx shadcn-ui@latest add https://your-domain.com/components/area-radio-group.json`;

// ... previous imports and code ...

const fullComponentCode = `"use client";

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
  ({ value, RadioGroupContainerProps, children, className, ...itemProps }, ref) => {
    const { className: containerClassName, ...containerProps } = RadioGroupContainerProps || {};
    
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
          aria-describedby={\`\${value}-description\`}
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
  ({ 
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
  }, ref) => {
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
                      id={\`\${item.value}-description\`}
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
          <p className={cn(
            "text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AreaRadioGroup.displayName = "AreaRadioGroup";

export default AreaRadioGroup;`;

// ... rest of the page code ...

const usageExamples = {
  basic: `import AreaRadioGroup from "@/components/base/radio/area-radio-group";

const items = [
  {
    id: "1",
    value: "option1",
    label: "Option 1",
    description: "Description for option 1"
  },
  {
    id: "2",
    value: "option2",
    label: "Option 2",
    description: "Description for option 2"
  }
];

export default function Example() {
  return (
    <AreaRadioGroup
      items={items}
      defaultValue="option1"
      onValueChange={(value) => console.log(value)}
    />
  );
}`,

  withImages: `import AreaRadioGroup from "@/components/base/radio/area-radio-group";

const paymentMethods = [
  {
    id: "card",
    value: "card",
    label: "Credit Card",
    description: "Pay with your credit card",
    imageUrl: "/icons/credit-card.svg"
  },
  {
    id: "paypal",
    value: "paypal",
    label: "PayPal",
    description: "Pay with PayPal",
    imageUrl: "/icons/paypal.svg"
  }
];

export default function PaymentSelector() {
  return (
    <AreaRadioGroup
      items={paymentMethods}
      defaultValue="card"
      orientation="horizontal"
    />
  );
}`,

  withHookForm: `import { useForm, Controller } from "react-hook-form";
import AreaRadioGroup from "@/components/base/radio/area-radio-group";

export default function PaymentForm() {
  const { control } = useForm({
    defaultValues: {
      paymentMethod: ""
    }
  });

  return (
    <Controller
      name="paymentMethod"
      control={control}
      rules={{ required: "Please select a payment method" }}
      render={({ field, fieldState }) => (
        <AreaRadioGroup
          items={paymentMethods}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          required
          {...field}
        />
      )}
    />
  );
}`,
};

// Example items for the demo
const demoItems = [
  {
    id: "1",
    value: "card",
    label: "Credit Card",
    description: "Pay with credit card via Stripe",
    imageUrl: "https://via.placeholder.com/32x24",
  },
  {
    id: "2",
    value: "paypal",
    label: "PayPal",
    description: "Pay with your PayPal account",
    imageUrl: "https://via.placeholder.com/32x24",
  },
];

const propDefinitions = [
  {
    prop: "items",
    type: "RadioItem[]",
    default: "[]",
    description: "Array of radio items to display",
  },
  {
    prop: "defaultValue",
    type: "string",
    default: "-",
    description: "The default selected value",
  },
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"vertical"',
    description: "The layout orientation of the radio group",
  },
  {
    prop: "error",
    type: "boolean",
    default: "false",
    description: "Whether the radio group is in an error state",
  },
  {
    prop: "helperText",
    type: "string",
    default: "-",
    description: "Helper text shown below the radio group",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description: "Whether the radio group is required",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    default: "-",
    description: "Callback fired when the value changes",
  },
];

export default function RadioGroupPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-6">
        <DynamicBreadcrumb />
      </div>

      {/* Introduction */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Area Radio Group</h1>
        <p className="text-muted-foreground">
          A flexible radio group component that supports rich content, images,
          and descriptions. Perfect for payment method selectors, plan choosers,
          and more.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Tabs defaultValue="cli">
          <TabsList className="mb-4">
            <TabsTrigger value="cli">
              <Terminal className="h-4 w-4 mr-2" />
              CLI
            </TabsTrigger>
            <TabsTrigger value="manual">
              <FileCode2 className="h-4 w-4 mr-2" />
              Manual
            </TabsTrigger>
            <TabsTrigger value="npm">
              <Package className="h-4 w-4 mr-2" />
              npm
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli">
            <CodeBlock code={cliInstallCode} language="bash" />
          </TabsContent>

          <TabsContent value="manual">
            <ManualInstall code={fullComponentCode} />
          </TabsContent>

          <TabsContent value="npm">
            <CodeBlock code={installCode.npm} language="bash" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Usage</h2>
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="withImages">With Images</TabsTrigger>
            <TabsTrigger value="withHookForm">Form Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="mb-4">
              <AreaRadioGroup items={demoItems} defaultValue="card" />
            </div>
            <CodeBlock code={usageExamples.basic} language="tsx" />
          </TabsContent>

          <TabsContent value="withImages">
            <div className="mb-4">
              <AreaRadioGroup
                items={demoItems}
                defaultValue="card"
                orientation="horizontal"
              />
            </div>
            <CodeBlock code={usageExamples.withImages} language="tsx" />
          </TabsContent>

          <TabsContent value="withHookForm">
            <CodeBlock code={usageExamples.withHookForm} language="tsx" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Props */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-medium">Prop</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Default</th>
                <th className="text-left p-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {propDefinitions.map(
                ({ prop, type, default: defaultValue, description }) => (
                  <tr key={prop} className="border-b">
                    <td className="p-4 font-mono text-sm">{prop}</td>
                    <td className="p-4 font-mono text-sm text-muted-foreground">
                      {type}
                    </td>
                    <td className="p-4 font-mono text-sm text-muted-foreground">
                      {defaultValue}
                    </td>
                    <td className="p-4 text-sm">{description}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Uses native radio inputs for better accessibility</li>
          <li>Supports keyboard navigation (Tab, Space, Arrow keys)</li>
          <li>Includes proper ARIA labels and descriptions</li>
          <li>Visual indicators for focus and selection states</li>
        </ul>
      </div>
    </div>
  );
}
