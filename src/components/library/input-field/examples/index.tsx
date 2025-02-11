import InputField from "@/components/ui/input-field";
import PasswordInput from "../examples/password-input";

export const examples = [
  {
    title: "Basic Input",
    description: "A basic input example with username and password fields.",
    preview: (
      <div className="flex flex-col gap-4">
        <InputField label="Username" placeholder="Enter your username" />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
    ),
    code: `<InputField label="Username" placeholder="Enter your username" />
<InputField
  label="Password"
  type="password"
  placeholder="Enter your password"
/>`,
  },
  {
    title: "Input with Icons",
    description: "Input fields with start and end adornments using icons.",
    preview: <PasswordInput />,
    code: `<InputField
  label="Email"
  placeholder="Enter your email"
  InputProps={{
    startAdornment: <Mail className="h-4 w-4" />,
  }}
/>
<InputField
  label="Password"
  type="password"
  placeholder="Enter your password"
  InputProps={{
    startAdornment: <Lock className="h-4 w-4" />,
    endAdornment: <Eye className="h-4 w-4 cursor-pointer" />,
  }}
/>`,
  },
  {
    title: "Input With States",
    description: "Various input states including error, success, and disabled.",
    preview: (
      <div className="flex flex-col gap-4">
        <InputField
          label="Error State"
          error
          helperText="This field is required"
          placeholder="Error input"
        />
        <InputField
          label="Success State"
          success
          helperText="Username is available"
          placeholder="Success input"
        />
        <InputField
          label="Disabled State"
          disabled
          placeholder="Disabled input"
        />
      </div>
    ),
    code: `<InputField
  label="Error State"
  error
  helperText="This field is required"
  placeholder="Error input"
/>
<InputField
  label="Success State"
  success
  helperText="Username is available"
  placeholder="Success input"
/>
<InputField
  label="Disabled State"
  disabled
  placeholder="Disabled input"
/>`,
  },
  {
    title: "Input With Sizes",
    description: "Different input sizes: small, default, and large.",
    preview: (
      <div className="flex flex-col gap-4">
        <InputField
          label="Small Input"
          inputSize="sm"
          placeholder="Small input"
        />
        <InputField
          label="Default Input"
          inputSize="default"
          placeholder="Default input"
        />
        <InputField
          label="Large Input"
          inputSize="lg"
          placeholder="Large input"
        />
      </div>
    ),
    code: `<InputField
  label="Small Input"
  inputSize="sm"
  placeholder="Small input"
/>
<InputField
  label="Default Input"
  inputSize="default"
  placeholder="Default input"
/>
<InputField
  label="Large Input"
  inputSize="lg"
  placeholder="Large input"
/>`,
  },
];

export const hookFormUsageCode = `"use client";

import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import InputField from "@/components/ui/input-field";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (value: any) => {
    console.log("🚀 ~ onSubmit ~ value:", value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Email"
        required
        error={!!errors.email}
        helperText={errors.email?.message?.toString()}
        InputProps={{
          startAdornment: <Mail className="h-4 w-4" />,
        }}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
      />
    </form>
  );
}
`;
