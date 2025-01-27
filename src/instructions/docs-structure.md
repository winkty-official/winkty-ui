Component Documentation Structure

1. Breadcrumb Navigation

   Home / Components / ComponentName

2. Introduction

   A brief overview of what the component does and when to use it.

3. Installation
   Manual Installation

# add a tabs where you can choose the installation method tabs heading with package manager and their respective icons. a copy button icon should be on the right side of the code block file instruction in manual install give user ability to copy full code if it needed multile file add then in proper manner , if cntent is more length then use shadcn scroll area to show code in manual install.

```sh
pnpm add @yourlibrary/component-name
# or
npm install @yourlibrary/component-name
# or
yarn add @yourlibrary/component-name
```

shadcn CLI Installation

```sh
npx shadcn-ui@latest add https://your-domain.com/components/auth-form.json
```

# add a code example for the usage of the component in tabs with the code block and the code example

4.  Usage
    Basic Example

        A minimal working example of the component.

import { ComponentName } from "@yourlibrary/component-name";

export function Example() {
return <ComponentName prop1="value" />;
}

5.  Examples
    Example 1: Simple Usage

        Explanation of the use case.

<ComponentName prop1="value1" prop2="value2" />

Example 2: Advanced Usage

    More detailed example showing additional features.

<ComponentName prop1="value1" prop2="value2" prop3={{ nested: true }} />

6. Props Table
   Prop Name Type Default Description
   prop1 string "default" Description of prop1
   prop2 boolean false Description of prop2
   prop3 object {} Description of prop3
7. Accessibility (a11y) Considerations

   Notes on ARIA attributes, keyboard navigation, and best practices.

8. Customization

   Styling with Tailwind CSS and overriding default styles.

.component-name {
@apply text-lg font-semibold;
}

9. Related Components

   Links to similar or complementary components.
