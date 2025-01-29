import SimpleInput from "@/components/base/inputs/simple-input";
import { Lock, Mail } from "lucide-react";

export const examples = [
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

export const hookFormUsageCode = `import { useForm } from "react-hook-form";
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
