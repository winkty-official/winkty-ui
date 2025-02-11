"use client";
import { AuthForm } from "@/components/layout/auth-form/auth-form";
import type { CodeExample } from "@/components/docs/code-examples";

export const usageExamples: CodeExample[] = [
  {
    title: "Sign In Form",
    description: "Basic sign in form with email and password",
    preview: (
      <div className="w-full max-w-md p-8 bg-background/95 rounded-lg">
        <AuthForm
          variant="signin"
          onSubmit={(data) => console.log("Sign in:", data)}
          onSuccess={(response) => console.log("Success:", response)}
        />
      </div>
    ),
    code: `import { AuthForm } from "@/components/ui/auth-form";

export function SignInExample() {
  return (
    <AuthForm
      variant="signin"
      onSubmit={(data) => console.log("Sign in:", data)}
      onSuccess={(response) => console.log("Success:", response)}
    />
  );
}`,
  },
  {
    title: "Sign Up Form",
    description: "Registration form with additional fields",
    preview: (
      <div className="w-full max-w-md p-8 bg-background/95 rounded-lg">
        <AuthForm
          variant="signup"
          onSubmit={(data) => console.log("Sign up:", data)}
          providers={["google", "github"]}
        />
      </div>
    ),
    code: `import { AuthForm } from "@/components/ui/auth-form";

export function SignUpExample() {
  return (
    <AuthForm
      variant="signup"
      onSubmit={(data) => console.log("Sign up:", data)}
      providers={["google", "github"]}
    />
  );
}`,
  },
  {
    title: "Password Reset",
    description: "Forgot password form with email verification",
    preview: (
      <div className="w-full max-w-md p-8 bg-background/95 rounded-lg">
        <AuthForm
          variant="forgot-password"
          onSubmit={(data) => console.log("Reset:", data)}
        />
      </div>
    ),
    code: `import { AuthForm } from "@/components/ui/auth-form";

export function PasswordResetExample() {
  return (
    <AuthForm
      variant="forgot-password"
      onSubmit={(data) => console.log("Reset:", data)}
    />
  );
}`,
  },
];
