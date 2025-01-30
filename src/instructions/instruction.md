# Project overview

you are building a component library build top of shadcn/ui and next.js. where user can install the code through shadcn CLI or manually copy and paste the code into their project.

you will be using the shadcn/ui library to build the components. Next js will be used to build the website. Tailwind css will be used to style the components. react-hook-form will be used to handle the form validation.lucide-react will be used to build the icons.

# Core functionality

Component Library

    Build a collection of UI components using shadcn/ui.
    Ensure components are customizable and reusable.
    Provide both installation via shadcn CLI and manual copy-paste options.

Website Development

    Use Next.js to create a documentation site.
    Implement a user-friendly interface for browsing and previewing components.
    Provide clear installation and usage instructions for each component.

Styling & Theming

    Utilize Tailwind CSS for styling components.
    Support dark mode and configurable themes.
    Ensure responsive design for all components.

Form Handling

    Use react-hook-form for form validation and state management.
    Provide accessible and customizable form components (e.g., inputs, selects, checkboxes).

Icons & UI Enhancements

    Use lucide-react for icons.
    Ensure consistent and modern UI/UX design.
    Optimize for performance and accessibility.

Code Accessibility

    Provide users with easy copy-paste code snippets.
    Ensure well-documented and structured code.
    Support TypeScript for better developer experience.

Component Variants & Customization

    Offer different variations of components (e.g., outlined, filled, sizes).
    Provide props-based customization for flexibility.
    Enable easy integration with other Tailwind configurations.

# Docs

# Project Overview

You are building a component library on top of shadcn/ui and Next.js, where users can install the code through the shadcn CLI or manually copy and paste the code into their project.

## Technologies Used

- **shadcn/ui**: For building the UI components.
- **Next.js**: For developing the website and documentation.
- **Tailwind CSS**: For styling components.
- **react-hook-form**: For form validation and state management.
- **lucide-react**: For icons.

---

# Core Functionality

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

# Documentation Guide

## Installation

### 1. Using shadcn CLI

```sh
npx shadcn-ui@latest add https://your-domain.com/components/auth-form.json
```

### 2. Manual Installation

- Copy the provided component code.
- Paste it into your project inside the designated folder.
- Import and use it as needed.

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
tree -L 2 -I "node_modules|.next"
```

Example Output:

```
.
├── components
│   ├── ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
├── pages
│   ├── index.tsx
│   ├── docs.tsx
├── styles
│   ├── globals.css
├── public
│   ├── logo.svg
├── package.json
├── tailwind.config.js
├── tsconfig.json
```

---

# Contribution Guide

- Fork the repository.
- Create a new branch for your feature.
- Submit a pull request with a clear description.
- Follow the existing code style and naming conventions.

---

# License

This project is licensed under the MIT License.

# Current file structure

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
│ └── registry
│ ├── area-radio-group.json
│ ├── auth-form.json
│ ├── highlighted-article.json
│ ├── particle-field.json
│ └── simple-input.json
├── src
│ ├── app
│ │ ├── components
│ │ │ ├── (basic)
│ │ │ │ ├── input
│ │ │ │ │ ├── data
│ │ │ │ │ └── page.tsx
│ │ │ │ └── radio
│ │ │ │ ├── data
│ │ │ │ └── page.tsx
│ │ │ ├── (fancy)
│ │ │ │ ├── chromatic-ripple-effect
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── highlighted-article
│ │ │ │ │ ├── data
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── neon-pulse
│ │ │ │ │ └── page.tsx
│ │ │ │ └── particle-field
│ │ │ │ ├── data
│ │ │ │ └── page.tsx
│ │ │ ├── (layout)
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
│ │ ├── page.tsx
│ │ └── test
│ │ └── page.tsx
│ ├── assets
│ │ └── icons
│ │ └── payment
│ │ ├── amex.svg
│ │ ├── mastercard.svg
│ │ └── visa.svg
│ ├── components
│ │ ├── base
│ │ │ ├── breadcrumb.tsx
│ │ │ ├── buttons
│ │ │ ├── inputs
│ │ │ │ └── simple-input.tsx
│ │ │ └── radio
│ │ │ ├── area-radio-group.tsx
│ │ │ ├── example
│ │ │ │ ├── card-selector.tsx
│ │ │ │ ├── color-picker.tsx
│ │ │ │ ├── examples.tsx
│ │ │ │ └── layout-selector.tsx
│ │ │ └── manual-install.tsx
│ │ ├── docs
│ │ │ ├── accessibility.tsx
│ │ │ ├── code-examples.tsx
│ │ │ ├── header.tsx
│ │ │ ├── installation.tsx
│ │ │ ├── props-table.tsx
│ │ │ ├── sidebar.tsx
│ │ │ └── types.ts
│ │ ├── fancy
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
│ │ ├── icons
│ │ │ ├── payment
│ │ │ │ ├── amex-icon.tsx
│ │ │ │ └── mastercard-icon.tsx
│ │ │ └── payment-icons.tsx
│ │ ├── layout
│ │ │ ├── auth-form
│ │ │ │ ├── auth-card.tsx
│ │ │ │ ├── forgot-password.tsx
│ │ │ │ ├── sign-in.tsx
│ │ │ │ └── sign-up.tsx
│ │ │ ├── hero
│ │ │ └── payment
│ │ │ ├── card-preview.tsx
│ │ │ └── payment-form.tsx
│ │ ├── my-ui
│ │ └── ui
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
│ │ └── use-mobile.tsx
│ ├── instructions
│ │ ├── docs-structure.md
│ │ ├── instruction.md
│ │ └── registry.md
│ ├── lib
│ │ └── utils.ts
│ ├── pages
│ ├── provider
│ │ └── theme-provider.tsx
│ └── registry
│ └── area-radio-group
│ └── index.tsx
├── tailwind.config.ts
└── tsconfig.json
