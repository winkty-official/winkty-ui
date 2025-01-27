import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleInput from "@/components/base/inputs/simple-input";
import { Mail, Lock, Terminal, Package, Eye } from "lucide-react";
import { CodeBlock } from "@/components/home/code-block";
import { DynamicBreadcrumb } from "@/components/base/breadcrumb";

export const metadata: Metadata = {
  title: "Input - UI Components",
  description:
    "A flexible and accessible input component with various styles and states.",
};

const installCode = {
  npm: "npm install @yourlibrary/simple-input",
  pnpm: "pnpm add @yourlibrary/simple-input",
  yarn: "yarn add @yourlibrary/simple-input",
};

const cliInstallCode = `npx shadcn-ui@latest add https://your-domain.com/components/simple-input.json`;

const usageExamples = {
  basic: `import SimpleInput from "@/components/base/inputs/simple-input";

export default function Example() {
  return <SimpleInput label="Username" placeholder="Enter your username" />;
}`,

  withIcons: `import SimpleInput from "@/components/base/inputs/simple-input";
import { Mail , Eye} from "lucide-react";

export default function Example() {
  return (
    <SimpleInput
      label="Email"
      placeholder="Enter your email"
      InputProps={{
        startAdornment: <Mail className="h-4 w-4" />
      }}
    />
   <SimpleInput
      label="Password"
      type="password"
      placeholder="Enter your password"
      InputProps={{
        startAdornment: <Mail className="h-4 w-4" />,
        endAdornment: <Eye className="h-4 w-4 cursor-pointer" />
      }}
    />
  );
}`,

  withValidation: `import SimpleInput from "@/components/base/inputs/simple-input";

export default function Example() {
  return (
    <SimpleInput
      label="Required Field"
      required
      error={true}
      helperText="This field is required"
      placeholder="Enter value"
    />
  );
}`,

  withSizes: `import SimpleInput from "@/components/base/inputs/simple-input";

export default function Example() {
  return (
    <>
      <SimpleInput inputSize="sm" label="Small" placeholder="Small input" />
      <SimpleInput inputSize="default" label="Default" placeholder="Default input" />
      <SimpleInput inputSize="lg" label="Large" placeholder="Large input" />
    </>
  );
}`,
};

const hookFormUsageCode = `import { useForm } from "react-hook-form";
import SimpleInput from "@/components/base/inputs/simple-input";
import { Mail } from "lucide-react";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleInput
        label="Email"
        required
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: <Mail className="h-4 w-4" />,
        }}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })}
      />
    </form>
  );
}`;

const propDefinitions = [
  {
    prop: "label",
    type: "string",
    default: "-",
    description: "The label text displayed above the input",
  },
  {
    prop: "helperText",
    type: "string",
    default: "-",
    description: "Helper text displayed below the input",
  },
  {
    prop: "error",
    type: "boolean",
    default: "false",
    description: "Whether the input is in an error state",
  },
  {
    prop: "success",
    type: "boolean",
    default: "false",
    description: "Whether the input is in a success state",
  },
  {
    prop: "inputSize",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    description: "Controls the size of the input field",
  },
  {
    prop: "variant",
    type: '"default" | "outline" | "ghost"',
    default: '"default"',
    description: "The visual style variant of the input",
  },
  {
    prop: "wrapperClassName",
    type: "string",
    default: "-",
    description: "Additional classes for the input wrapper element",
  },
  {
    prop: "inputClassName",
    type: "string",
    default: "-",
    description: "Additional classes for the input element",
  },
  {
    prop: "InputProps",
    type: "object",
    default: "-",
    description: "Configuration object for input decorations",
  },
  {
    prop: "InputProps.startAdornment",
    type: "ReactNode",
    default: "-",
    description: "Element to display at the start of the input",
  },
  {
    prop: "InputProps.endAdornment",
    type: "ReactNode",
    default: "-",
    description: "Element to display at the end of the input",
  },
  {
    prop: "InputProps.style",
    type: "CSSProperties",
    default: "-",
    description: "Custom styles for the input element",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether the input is disabled",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description: "Whether the input is required",
  },
];

export default function InputPage() {
  return (
    <div className="container max-w-4xl py-10">
      {/* Replace the old breadcrumb with the new component */}
      <div className="mb-6">
        <DynamicBreadcrumb />
      </div>

      {/* Introduction */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Input</h1>
        <p className="text-muted-foreground">
          A flexible and accessible input component that supports various
          states, icons, and integrates seamlessly with React Hook Form.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Tabs defaultValue="npm">
          <TabsList className="mb-4">
            <TabsTrigger value="npm">
              <Package className="h-4 w-4 mr-2" />
              npm
            </TabsTrigger>
            <TabsTrigger value="pnpm">
              <Package className="h-4 w-4 mr-2" />
              pnpm
            </TabsTrigger>
            <TabsTrigger value="yarn">
              <Package className="h-4 w-4 mr-2" />
              yarn
            </TabsTrigger>
            <TabsTrigger value="cli">
              <Terminal className="h-4 w-4 mr-2" />
              CLI
            </TabsTrigger>
          </TabsList>
          <TabsContent value="npm">
            <CodeBlock code={installCode.npm} language="bash" />
          </TabsContent>
          <TabsContent value="pnpm">
            <CodeBlock code={installCode.pnpm} language="bash" />
          </TabsContent>
          <TabsContent value="yarn">
            <CodeBlock code={installCode.yarn} language="bash" />
          </TabsContent>
          <TabsContent value="cli">
            <CodeBlock code={cliInstallCode} language="bash" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage with Preview */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Usage</h2>
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="withIcons">With Icons</TabsTrigger>
            <TabsTrigger value="withValidation">Validation</TabsTrigger>
            <TabsTrigger value="withSizes">Sizes</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="mb-4">
              <SimpleInput label="Username" placeholder="Enter your username" />
            </div>
            <CodeBlock code={usageExamples.basic} language="tsx" />
          </TabsContent>

          <TabsContent value="withIcons">
            <div className="mb-4">
              <SimpleInput
                label="Email"
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: <Mail className="h-4 w-4" />,
                }}
              />
              <SimpleInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: <Mail className="h-4 w-4" />,
                  endAdornment: <Eye className="h-4 w-4 cursor-pointer" />,
                }}
              />
            </div>
            <CodeBlock code={usageExamples.withIcons} language="tsx" />
          </TabsContent>

          <TabsContent value="withValidation">
            <div className="mb-4">
              <SimpleInput
                label="Required Field"
                required
                error={true}
                helperText="This field is required"
                placeholder="Enter value"
              />
            </div>
            <CodeBlock code={usageExamples.withValidation} language="tsx" />
          </TabsContent>

          <TabsContent value="withSizes">
            <div className="flex flex-col gap-4 mb-4">
              <SimpleInput
                inputSize="sm"
                label="Small"
                placeholder="Small input"
              />
              <SimpleInput
                inputSize="default"
                label="Default"
                placeholder="Default input"
              />
              <SimpleInput
                inputSize="lg"
                label="Large"
                placeholder="Large input"
              />
            </div>
            <CodeBlock code={usageExamples.withSizes} language="tsx" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Examples */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Examples</h2>

        {/* Basic Input */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Basic Input</h3>
          <div className="flex flex-col gap-4">
            <SimpleInput label="Username" placeholder="Enter your username" />
            <SimpleInput
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* Input with Icons */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Input with Icons</h3>
          <div className="flex flex-col gap-4">
            <SimpleInput
              label="Email"
              placeholder="Enter your email"
              InputProps={{
                startAdornment: <Mail className="h-4 w-4" />,
              }}
            />
            <SimpleInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              InputProps={{
                startAdornment: <Lock className="h-4 w-4" />,
              }}
            />
          </div>
        </div>

        {/* Input States */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Input States</h3>
          <div className="flex flex-col gap-4">
            <SimpleInput
              label="Error State"
              error
              helperText="This field is required"
              placeholder="Error input"
            />
            <SimpleInput
              label="Success State"
              success
              helperText="Username is available"
              placeholder="Success input"
            />
            <SimpleInput
              label="Disabled State"
              disabled
              placeholder="Disabled input"
            />
          </div>
        </div>

        {/* Input Sizes */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Input Sizes</h3>
          <div className="flex flex-col gap-4">
            <SimpleInput
              label="Small Input"
              inputSize="sm"
              placeholder="Small input"
            />
            <SimpleInput
              label="Default Input"
              inputSize="default"
              placeholder="Default input"
            />
            <SimpleInput
              label="Large Input"
              inputSize="lg"
              placeholder="Large input"
            />
          </div>
        </div>

        {/* React Hook Form Integration */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">
            React Hook Form Integration
          </h3>
          <CodeBlock code={hookFormUsageCode} language="tsx" />
        </div>
      </div>

      {/* Props Table */}
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
          <li>Supports aria-invalid for error states</li>
          <li>Includes aria-describedby for helper text</li>
          <li>Label is properly associated with input</li>
          <li>
            Required fields are marked with both visual and aria indicators
          </li>
        </ul>
      </div>
    </div>
  );
}
