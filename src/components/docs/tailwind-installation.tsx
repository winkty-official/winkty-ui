import React from "react";
import { CodeBlock } from "@/components/home/code-block";

export function TailwindInstallation() {
  const installationSteps = [
    {
      title: "1. Install Tailwind CSS",
      description:
        "Install tailwindcss and its peer dependencies via npm, and create your tailwind.config.js file.",
      code: "npm install -D tailwindcss@3 postcss autoprefixer\nnpx tailwindcss init",
      language: "bash",
      isExecutableCommand: true,
    },
    {
      title: "2. Configure PostCSS",
      description:
        "Add tailwindcss and autoprefixer to your postcss.config.js file.",
      code: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}`,
      language: "javascript",
    },
    {
      title: "3. Configure Template Paths",
      description:
        "Add the paths to all of your template files in your tailwind.config.js file.",
      code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
      language: "javascript",
    },
    {
      title: "4. Add Tailwind Directives",
      description:
        "Add the @tailwind directives for each of Tailwind's layers to your main CSS file.",
      code: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
      language: "css",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Install Tailwind CSS</h2>
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
