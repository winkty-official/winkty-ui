import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import SimpleInput from "@/components/base/inputs/simple-input";
import { Accessibility } from "@/components/docs/accessibility";
import { CodeExamples } from "@/components/docs/code-examples";
import Header from "@/components/docs/header";
import { Installation } from "@/components/docs/installation";
import { CodeBlock } from "@/components/home/code-block";
import { Lock, Mail } from "lucide-react";
import { Metadata } from "next";
import inputAccessibility from "./data/accessibility";
import InputPageMetadata from "./data/metadata";
import { packageInfo } from "./data/package";
import propDefinitions from "./data/props";
import { PropsTable } from "@/components/docs/props-table";

export const metadata: Metadata = InputPageMetadata.meta;

const examples = [
  {
    title: "Basic Input",
    description: "A basic input example with username and password fields.",
    preview: (
      <div className="flex flex-col gap-4">
        <SimpleInput label="Username" placeholder="Enter your username" />
        <SimpleInput
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
    ),
    code: `<SimpleInput label="Username" placeholder="Enter your username" />
<SimpleInput
  label="Password"
  type="password"
  placeholder="Enter your password"
/>`,
  },
  {
    title: "Input with Icons",
    description: "Input fields with start and end adornments using icons.",
    preview: (
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
    ),
    code: `<SimpleInput
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
/>`,
  },
  {
    title: "Input States",
    description: "Various input states including error, success, and disabled.",
    preview: (
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
    ),
    code: `<SimpleInput
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
/>`,
  },
  {
    title: "Input Sizes",
    description: "Different input sizes: small, default, and large.",
    preview: (
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
    ),
    code: `<SimpleInput
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
/>`,
  },
];

const hookFormUsageCode = `import { useForm } from "react-hook-form";
import SimpleInput from "@/components/base/inputs/simple-input";
import { Mail } from "lucide-react";
import { Accessibility } from '../../../../components/docs/accessibility';

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

export default function InputPage() {
  return (
    <div className="container max-w-4xl py-10 space-y-10">
      <div className="space-y-4">
        <DynamicBreadcrumb />
        <Header
          title={InputPageMetadata.title}
          description={InputPageMetadata.description}
        />
      </div>

      {/* Installation */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Installation {...packageInfo} />
      </div>

      {/* Examples */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <CodeExamples examples={examples} />
      </div>

      {/* React Hook Form Integration */}
      <div>
        <h3 className="text-xl font-medium mb-4">
          React Hook Form Integration
        </h3>
        <CodeBlock code={hookFormUsageCode} language="tsx" />
      </div>

      {/* Props Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <PropsTable definitions={propDefinitions} />
      </div>

      {/* Accessibility */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <Accessibility features={inputAccessibility} />
      </div>
    </div>
  );
}
