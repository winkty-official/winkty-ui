import React from "react";
import { CodeBlock } from "../home/code-block";
import globalConfig from "@/config";

export function ComponentsInstallation() {
  const installationSteps = [
    {
      title: "1. Initialize Components",
      description:
        "Use the init command to initialize configuration and dependencies for your project. This will install dependencies, add the cn util, configure tailwind.config.js, and set up CSS variables.",
      code: "npx shadcn@latest init",
      language: "bash",
      isExecutableCommand: true,
    },
    {
      title: "2. Configuration Options",
      description:
        "The init command supports several options for customization:",
      code: `Usage: shadcn init [options] [components...]

Options:
  -d, --defaults    use default values (new-york, zinc, css variables)
  -f, --force       force overwrite of existing components.json
  -y, --yes         skip confirmation prompt
  -c, --cwd <cwd>   the working directory
  -h, --help        display help for command`,
      language: "bash",
    },
    {
      title: "3. Adding Components",
      description: "Use the add command to include components in your project:",
      code: "npx shadcn@latest add [component]",
      language: "bash",
      isExecutableCommand: true,
    },
    {
      title: "4. Add Command Options",
      description: "The add command supports several options for flexibility:",
      code: `Usage: shadcn add [options] [components...]

Options:
  -y, --yes          skip confirmation prompt
  -o, --overwrite    overwrite existing files
  -c, --cwd <cwd>    the working directory
  -p, --path <path>  the path to add the component to
  -h, --help         display help for command`,
      language: "bash",
    },
    {
      title: "5. Monorepo Support",
      description:
        "For monorepo setups, specify the workspace path using the -c option:",
      code: `# Initialize in a specific workspace
npx shadcn@latest init -c ./apps/www

# Add components to a specific workspace
npx shadcn@latest add alert-dialog -c ./apps/www`,
      language: "bash",
      isExecutableCommand: true,
    },
    {
      title: "6. Installing Aceternity UI Components",
      description: "Install Aceternity UI components directly through the CLI:",
      code: `# General format
npx shadcn@latest add ${globalConfig.BASE_URI}/registry/[component].json

# Example: Installing the bento-grid component
npx shadcn@latest add ${globalConfig.BASE_URI}/registry/bento-grid.json`,
      language: "bash",
      isExecutableCommand: true,
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Components Installation Guide</h2>
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
    </div>
  );
}
