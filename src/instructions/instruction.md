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
npx shadcn-ui@latest add component-name
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
├── eslint.config.mjs
├── instructions
│ └── instruction.md
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│ ├── components
│ │ └── button.json
│ ├── file.svg
│ ├── globe.svg
│ ├── next.svg
│ ├── vercel.svg
│ └── window.svg
├── src
│ ├── app
│ │ ├── api
│ │ ├── components
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── component-usage
│ │ ├── autocomplate
│ │ └── input
│ ├── components
│ │ ├── auth-form
│ │ ├── autocomplete
│ │ ├── buttons
│ │ ├── checkbox
│ │ ├── code-block.tsx
│ │ ├── features-grid.tsx
│ │ ├── floating-feature.tsx
│ │ ├── footer.tsx
│ │ ├── hero-section.tsx
│ │ ├── input
│ │ ├── live-editor-section.tsx
│ │ ├── payment
│ │ ├── select
│ │ ├── sliders
│ │ ├── tabs
│ │ ├── theme-provider.tsx
│ │ ├── theme-toggle.tsx
│ │ ├── toggle
│ │ └── ui
│ ├── hooks
│ │ ├── use-debounce.ts
│ │ └── use-toast.ts
│ ├── lib
│ │ └── utils.ts
│ └── registry
│ ├── components
│ ├── index.json
│ └── schema.json
├── tailwind.config.ts
└── tsconfig.json
