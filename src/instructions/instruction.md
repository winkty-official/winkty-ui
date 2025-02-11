# Project Overview

NexusIX is an enterprise-grade component library built on modern web technologies, combining the power of framer-motion 12+ + Popmotion with shadcn/ui with Next.js 15's advanced capabilities. Designed for developers who demand both aesthetic polish and technical excellence, this library provides:

Production-Ready Components: 150+ accessible UI elements built with Radix UI primitives

Full-Stack Integration: Seamless compatibility with Next.js App Router and React Server Components

Performance Optimized: Components average <5kB bundle size with intelligent code splitting

Multi-Paradigm Styling: CSS Variables + Tailwind CSS + Optional CSS-in-JS integration

Enterprise Features: TypeScript-first API, Auth-ready forms, Payment integrations

## Stack Overview

- **Foundation**: Built on shadcn/ui v0.7+ (Radix UI primitives)
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 3.4+ with CSS Variables
- **Forms**: react-hook-form 7+ with Zod integration
- **Icons**: lucide-react 0.474+
- **Icons**: react-icons 5+
- **Animations**: framer-motion 12+ + Popmotion
- **Type Safety**: TypeScript 5+

# Core functionality

## Component Architecture System

```jsx
// Example Component Structure
<SmartForm
  schema={PaymentSchema}
  onSubmit={handlePayment}
  className="w-[600px]"
>
  <PaymentCardPreview />
  <AutoCompletePaymentField options={currencies} />
  <SecurityCodeInput withRippleEffect />
  <FormSubmitButton loadingContent={<ParticleLoader />} variant="neon" />
</SmartForm>
```

## Key Features:

Atomic Design Pattern: Components organized as Atoms > Molecules > Organisms

Adaptive Dark Mode: Automatic system preference + manual override

Zero-Config Responsive: Breakpoint-aware components with mobile-first CSS

Headless Option: Use components without default styling via unstyled prop

Context-Driven: Component groups share state via React Context API

## Documentation Engine

```
docs/
├── Interactive Playground
├── Prop Type Visualization
├── Accessibility Audit Results
├── Bundle Size Metrics
└── Version Migration Guides
```

## Documentation Features:

Live Code Editor: Edit component props in real-time (CodeSandbox integration)

Visual Regression Testing: Component states comparison tool

API Explorer: Generate TypeScript interfaces from component examples

Performance Dashboard: Lighthouse scores per component

Multi-Language Support: Code samples in TS/JS/CJS/ESM formats

## Enterprise-Grade Forms

```tsx
// Secure Payment Form Implementation
const PaymentForm = () => (
  <Form encryptSecrets securityLevel="PCI-DSS">
    <CreditCardInput
      validateOn="blur"
      cardTypes={[VISA, MASTERCARD]}
      errorTranslations={paymentErrors}
    />
    <ThreeDSecureWrapper>
      <SubmitButton
        loadingState={<ChromaticLoader />}
        successEffect="particle-confetti"
      />
    </ThreeDSecureWrapper>
  </Form>
);
```

Form Capabilities:
Bank-Level Security: AES-256 encryption + PCI-DSS compliance

Multi-Step Validation: Field-level + cross-field + async server validation

Payment Ready: Prebuilt Stripe/Card integrations

Error Localization: 45+ language error messages

Analytics Integration: Track form abandonment metrics

## Component Library

- Build a collection of UI components using shadcn/ui.
- Ensure components are customizable and reusable.
- Provide both installation via shadcn CLI and manual copy-paste options.

## Website Development

- Use Next.js to create a documentation site.
- Implement a user-friendly interface for browsing and previewing components.
- Provide clear installation and usage instructions for each component.

## Styling & Theming

- Utilize Tailwind CSS for styling components.
- Support dark mode and configurable themes.
- Ensure responsive design for all components.

## Form Handling

- Use react-hook-form for form validation and state management.
- Provide accessible and customizable form components (e.g., inputs, selects, checkboxes).

## Icons & UI Enhancements

- Use lucide-react for icons.
- Ensure consistent and modern UI/UX design.
- Optimize for performance and accessibility.

## Code Accessibility

- Provide users with easy copy-paste code snippets.
- Ensure well-documented and structured code.
- Support TypeScript for better developer experience.

## Component Variants & Customization

- Offer different variations of components (e.g., outlined, filled, sizes).
- Provide props-based customization for flexibility.
- Enable easy integration with other Tailwind configurations.

---

## Advanced Styling System

````css
/* Custom Theme Example */
:root {
  --primary-gradient: linear-gradient(
    135deg,
    hsl(215 100% 60%) 0%,
    hsl(215 100% 40%) 100%
  );
  --neon-effect: 0 0 15px hsl(215 100% 60% / 0.4);
}

.dark {
  --surface-elevation: hsl(215 18% 16%);
  --text-primary: hsl(215 28% 92%);
}
```

## Styling Features:

- Theme Studio: Visual theme configurator with CSS variable mapping

-   Dynamic Effects: Parametric shadows, animated gradients, particle systems

- Style Encryption: Obfuscated critical CSS for anti-scraping

- CSS Auditing: PurgeCSS + Critical CSS in production builds

- Design Token System: Math-based spacing/typography scales
# Documentation Guide

## Installation

### 1. Using shadcn CLI

```bash
npx shadcn-ui@latest add \
process.env.BASE_URI/components/area-switch.json \
process.env.BASE_URI/components/dialog.json
````

### 2. Manual Installation

Create components/ui/area-switch.tsx

Copy component code from documentation

Add required dependencies:

```bash
npm install @radix-ui/react-switch lucide-react
```

## Example Usage

```tsx
import { Button } from "@/components/ui/button";

export default function Example() {
  return <Button variant="outline">Click Me</Button>;
}
```

---

## code exampel

```tsx
/**
 * Enhanced Switch component with label and description support
 *
 * @param {string} id - Unique identifier for accessibility
 * @param {React.ReactNode} children - Main label content
 * @param {string} description - Optional helper text
 * @param {React.HTMLAttributes} SwitchContainerProps - Container HTML attributes
 *
 * @example <AreaSwitch id="notifications" description="Receive email alerts">
 *   <span className="font-medium">Email Notifications</span>
 * </AreaSwitch>
 */
import React, { forwardRef, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

interface AreaSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  id: string;
  children?: React.ReactNode;
  description?: string;
  SwitchContainerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const AreaSwitch = forwardRef<HTMLDivElement, AreaSwitchProps>(
  (
    {
      id,
      children,
      description,
      SwitchContainerProps,
      className,
      ...switchProps
    },
    ref
  ) => {
    // Create a ref for the entire component
    const componentRef = useRef<HTMLDivElement>(null);

    // If a ref is passed to the component, use it, otherwise fall back to componentRef
    const combinedRef = ref || componentRef;

    return (
      <div
        ref={combinedRef} // Attach the ref here
        {...SwitchContainerProps}
        className={cn(
          "relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring",
          SwitchContainerProps?.className
        )}
        aria-describedby={
          componentRef.current
            ? `${componentRef.current.id}-description`
            : undefined
        }
      >
        <Switch
          id={id}
          {...switchProps} // Spread switchProps to pass down all switch-related attributes
          className={cn(
            "order-1 h-5 w-10 after:absolute after:inset-0 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-5 rtl:[&_span]:data-[state=checked]:-translate-x-5",
            className
          )}
        />
        <div className="flex grow items-start gap-3">{children}</div>
      </div>
    );
  }
);

AreaSwitch.displayName = "AreaSwitch"; // For better debugging in DevTools

export default AreaSwitch;
```

```tsx
<AreaSwitch id="area-switch" description="This is a description">
  <p>This is a description</p>
</AreaSwitch>
```

```tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * Accessible modal dialog with configurable transitions
 *
 * @param {React.ReactNode} children - Dialog content
 * @param {string} size - Size variant (sm|md|lg|xl)
 *
 * @example <Dialog>
 *   <DialogContent size="lg">
 *     <DialogHeader>...</DialogHeader>
 *   </DialogContent>
 * </Dialog>
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

# File Structure

To view the project structure, run the following command on macOS:

```sh
tree -L 7 -I "node_modules|.next"
```

## Documentation System

.
├── README.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│ ├── components-img
│ │ └── file-tree-preview.png
│ └── registry
│ ├── area-radio-group.json
│ ├── async-autocomplete.json
│ ├── auth-form.json
│ ├── file-tree.json
│ ├── highlighted-article.json
│ ├── particle-field.json
│ └── simple-input.json
├── src
│ ├── app
│ │ ├── components
│ │ │ ├── (basic) # basic components (e.g. button, input, card, etc.)
│ │ │ │ ├── autocomplete
│ │ │ │ │ ├── data
│ │ │ │ │ │ ├── accessibility.ts
│ │ │ │ │ │ ├── package.ts
│ │ │ │ │ │ └── props.ts
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── file-tree
│ │ │ │ │ ├── data
│ │ │ │ │ │ ├── accessibility.ts
│ │ │ │ │ │ ├── package.ts
│ │ │ │ │ │ └── props.ts
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── input
│ │ │ │ │ ├── data
│ │ │ │ │ │ ├── accessibility.ts
│ │ │ │ │ │ ├── examples.tsx
│ │ │ │ │ │ ├── metadata.ts
│ │ │ │ │ │ ├── package.ts
│ │ │ │ │ │ └── props.ts
│ │ │ │ │ └── page.tsx
│ │ │ │ └── radio
│ │ │ │ ├── data
│ │ │ │ │ ├── accessibility.ts
│ │ │ │ │ ├── examples.ts
│ │ │ │ │ ├── metadata.ts
│ │ │ │ │ ├── package.ts
│ │ │ │ │ └── props.ts
│ │ │ │ └── page.tsx
│ │ │ ├── (fancy) # fancy components (e.g. chromatic-ripple-effect, highlighted-article, neon-pulse, particle-field, etc.)
│ │ │ │ ├── chromatic-ripple-effect
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── highlighted-article
│ │ │ │ │ ├── data
│ │ │ │ │ │ ├── accessibility.ts
│ │ │ │ │ │ ├── examples.tsx
│ │ │ │ │ │ ├── package.ts
│ │ │ │ │ │ └── props.ts
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── neon-pulse
│ │ │ │ │ └── page.tsx
│ │ │ │ └── particle-field
│ │ │ │ ├── data
│ │ │ │ │ ├── accessibility.ts
│ │ │ │ │ ├── examples.tsx
│ │ │ │ │ ├── package.ts
│ │ │ │ │ ├── previews.tsx
│ │ │ │ │ └── props.ts
│ │ │ │ └── page.tsx
│ │ │ ├── (layout) # layout components (e.g. auth-form, payment-card, etc.)
│ │ │ │ ├── auth-form
│ │ │ │ │ ├── docs.tsx
│ │ │ │ │ └── page.tsx
│ │ │ │ └── payment-card
│ │ │ │ └── page.tsx
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── assets
│ │ └── icons
│ │ └── payment
│ │ ├── amex.svg
│ │ ├── mastercard.svg
│ │ └── visa.svg
│ ├── components
│ │ ├── base # base components (e.g. autocomplete, breadcrumb, buttons, inputs, etc.)
│ │ │ ├── autocomplete
│ │ │ │ ├── AsyncAutoComplete.usage.tsx
│ │ │ │ ├── async-autocomplete.tsx
│ │ │ │ ├── basic-autocomplete.tsx
│ │ │ │ ├── custom-autocomplete.tsx
│ │ │ │ ├── examples.tsx
│ │ │ │ ├── form.example.tsx
│ │ │ │ ├── index.ts
│ │ │ │ ├── multi-select-autocomplete.tsx
│ │ │ │ ├── normal-autocomplete.tsx
│ │ │ │ ├── searchable-autocomplete.tsx
│ │ │ │ └── types.ts
│ │ │ ├── breadcrumb.tsx
│ │ │ ├── buttons
│ │ │ ├── inputs
│ │ │ │ └── simple-input.tsx
│ │ │ └── radio
│ │ │ ├── area-radio-group.tsx
│ │ │ └── example
│ │ │ ├── card-selector.tsx
│ │ │ ├── color-picker.tsx
│ │ │ ├── examples.tsx
│ │ │ └── layout-selector.tsx
│ │ ├── docs # documentation for the components
│ │ │ ├── accessibility.tsx
│ │ │ ├── code-examples.tsx
│ │ │ ├── header.tsx
│ │ │ ├── installation.tsx
│ │ │ ├── manual-install.tsx
│ │ │ ├── props-table.tsx
│ │ │ ├── sidebar.tsx
│ │ │ └── types.ts
│ │ ├── fancy # fancy components (e.g. chromatic-ripple-effect, highlighted-article, mouse-ripple-effect, neon-pulse, etc.)
│ │ │ ├── chromatic-ripple-effect
│ │ │ │ └── chromatic-ripple-effect.tsx
│ │ │ ├── highlighted-article.tsx
│ │ │ ├── mouse-ripple-effect.tsx
│ │ │ ├── neon-pulse
│ │ │ │ └── neon-pulse.tsx
│ │ │ ├── particle-field
│ │ │ │ ├── examples.tsx
│ │ │ │ └── particle-field.tsx
│ │ │ └── text-hover-effect.tsx
│ │ ├── home
│ │ │ ├── code-block.tsx
│ │ │ ├── features-grid.tsx
│ │ │ ├── floating-feature.tsx
│ │ │ ├── footer.tsx
│ │ │ ├── hero-section.tsx
│ │ │ ├── index.tsx
│ │ │ ├── live-editor-section.tsx
│ │ │ └── theme-toggle.tsx
│ │ ├── icons # icons for the components
│ │ │ ├── payment
│ │ │ │ ├── amex-icon.tsx
│ │ │ │ └── mastercard-icon.tsx
│ │ │ └── payment-icons.tsx
│ │ ├── layout # layout components (e.g. auth-form, payment-card, etc.)
│ │ │ ├── auth-form
│ │ │ │ ├── auth-card.tsx
│ │ │ │ ├── forgot-password.tsx
│ │ │ │ ├── sign-in.tsx
│ │ │ │ └── sign-up.tsx
│ │ │ ├── hero # hero section for the website
│ │ │ └── payment # payment components (e.g. card-preview, payment-form, etc.)
│ │ ├── my-ui # my-ui components (e.g. navigation, ui, etc.)
│ │ │ ├── navigation # navigation components (e.g. file-tree, nav-bar, etc.)
│ │ │ │ ├── file-tree
│ │ │ │ │ ├── examples.tsx
│ │ │ │ │ ├── file-icon.tsx
│ │ │ │ │ ├── file-tree.tsx
│ │ │ │ ├── tree-node.tsx
│ │ │ │ └── type
│ │ │ │ └── file.ts
│ │ │ └── nav-bar
│ │ └── ui # shadcn ui components only
│ │ ├── accordion.tsx
│ │ ├── alert-dialog.tsx
│ │ ├── aspect-ratio.tsx
│ │ ├── avatar.tsx
│ │ ├── badge.tsx
│ │ ├── breadcrumb.tsx
│ │ ├── button.tsx
│ │ ├── calendar.tsx
│ │ ├── card.tsx
│ │ ├── carousel.tsx
│ │ ├── checkbox.tsx
│ │ ├── collapsible.tsx
│ │ ├── command.tsx
│ │ ├── context-menu.tsx
│ │ ├── dialog.tsx
│ │ ├── drawer.tsx
│ │ ├── dropdown-menu.tsx
│ │ ├── form.tsx
│ │ ├── hover-card.tsx
│ │ ├── input-otp.tsx
│ │ ├── input.tsx
│ │ ├── label.tsx
│ │ ├── menubar.tsx
│ │ ├── navigation-menu.tsx
│ │ ├── pagination.tsx
│ │ ├── popover.tsx
│ │ ├── progress.tsx
│ │ ├── radio-group.tsx
│ │ ├── resizable.tsx
│ │ ├── scroll-area.tsx
│ │ ├── select.tsx
│ │ ├── separator.tsx
│ │ ├── sheet.tsx
│ │ ├── sidebar.tsx
│ │ ├── skeleton.tsx
│ │ ├── slider.tsx
│ │ ├── switch.tsx
│ │ ├── table.tsx
│ │ ├── tabs.tsx
│ │ ├── textarea.tsx
│ │ ├── toast.tsx
│ │ ├── toggle-group.tsx
│ │ ├── toggle.tsx
│ │ └── tooltip.tsx
│ ├── hooks
│ │ ├── use-debounce.ts
│ │ └── use-mobile.tsx
│ ├── instructions
│ │ ├── docs-structure.md
│ │ ├── instruction.md
│ │ └── registry.md
│ ├── lib
│ │ ├── api.ts
│ │ └── utils.ts
│ ├── pages
│ ├── provider
│ │ └── theme-provider.tsx
│ └── registry
│ └── area-radio-group
│ └── index.tsx
├── tailwind.config.ts
└── tsconfig.json

# License

This project is licensed under the MIT License.
