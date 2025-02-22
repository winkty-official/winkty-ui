import React from "react";
import { CodeBlock } from "../home/code-block";

export function ShadcnInstallation() {
  const installationSteps = [
    {
      title: "1. Initialize shadcn-ui",
      description:
        "Run the init command to set up shadcn-ui in your React project:",
      code: "npx shadcn@latest init",
      language: "bash",
      isExecutableCommand: true,
    },
    {
      title: "2. Quick Setup with Defaults",
      description:
        "Alternatively, you can use the -d flag to use the default configuration (New York style, Zinc color, and CSS variables):",
      code: "npx shadcn@latest init -d",
      language: "bash",
      isExecutableCommand: true,
    },
    {
      title: "3. Configuration Options",
      description:
        "During initialization, you'll configure the following in components.json:",
      code: `// These are the questions you'll be asked:

Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › yes`,
      language: "bash",
    },
    {
      title: "4. Adding Components",
      description:
        "After initialization, you can start adding components. For example, to add a button:",
      code: "npx shadcn@latest add button",
      language: "bash",
      isExecutableCommand: true,
    },
    {
      title: "5. Using Components",
      description: "Import and use the components in your React components:",
      code: `import { Button } from "./components/ui/button"

export default function MyComponent() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}`,
      language: "typescript",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Install shadcn-ui</h2>
        <p className="text-gray-600">
          shadcn-ui provides a collection of reusable components that you can
          copy and paste into your apps. Follow these steps to add it to your
          React project.
        </p>
      </div>

      {installationSteps.map((step, index) => (
        <div key={index} className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>

          <CodeBlock
            code={step.code}
            language={step.language}
            isExecutableCommand={step.isExecutableCommand}
          />
        </div>
      ))}

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-lg font-semibold text-blue-800 mb-2">Pro Tips</h4>
        <ul className="list-disc list-inside space-y-2 text-blue-700">
          <li>
            Components are added to your{" "}
            <code className="bg-blue-100 px-2 py-1 rounded">components/ui</code>{" "}
            directory
          </li>
          <li>
            You can customize the styling by modifying the component files
            directly
          </li>
          <li>
            The configuration is stored in{" "}
            <code className="bg-blue-100 px-2 py-1 rounded">
              components.json
            </code>
          </li>
          <li>
            Use{" "}
            <code className="bg-blue-100 px-2 py-1 rounded">
              npx shadcn@latest add [component-name]
            </code>{" "}
            to add more components as needed
          </li>
        </ul>
      </div>
    </div>
  );
}
