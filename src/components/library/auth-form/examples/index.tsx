"use client";
import {
  CodeExamples,
  type CodeExample,
} from "@/components/docs/code-examples";
import ForgotpasswordExample from "./forget-password";
import ResetpasswordExample from "./reset-password";
import SigninExample from "./signin";
import SignUpExample from "./signup";

export const usageExamples: CodeExample[] = [
  {
    title: "Sign In Form",
    description: "Basic sign in form with email and password",
    preview: (
      <div className="w-full max-w-md p-8 bg-background/95 rounded-lg">
        <SigninExample />
      </div>
    ),
    code: `"use client";

import { z } from "zod";
import { AuthForm } from "..";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SigninExample() {
  async function onSubmit(values: SignInFormValues) {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className={cn("w-[380px]")}>
      <CardContent className="pt-6">
        <AuthForm
          type="SIGN_IN"
          schema={signInSchema}
          onSubmit={onSubmit}
          defaultValues={{
            email: "",
            password: "",
          }}
          authDescription="Welcome back! Sign in to your account"
          authTitle="Sign In"
          providers={["google", "github"]}
        />
      </CardContent>
    </Card>
  );
}
`,
  },
  {
    title: "Sign Up Form",
    description: "Registration form with additional fields",
    preview: (
      <div className="w-full max-w-md p-8 bg-background/95 rounded-lg">
        <SignUpExample />
      </div>
    ),
    code: `/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { z } from "zod";
import { AuthForm } from "..";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const signUpSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpExample() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: SignUpFormValues) => {
    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
    } catch (error: any) {
      console.error("Sign-up error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn("w-[380px]")}>
      <CardContent className="pt-6">
        <AuthForm
          type="SIGN_UP"
          schema={signUpSchema}
          onSubmit={onSubmit}
          defaultValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          loading={loading}
          authDescription="Start your 30 day free trial. Cancel any time"
          authTitle="Account Sign In"
        />
      </CardContent>
    </Card>
  );
}
`,
  },
  {
    title: "Password Reset",
    description: "Forgot password form with email verification",
    preview: (
      <div className="w-full max-w-md p-8 bg-background/95 rounded-lg">
        <ResetpasswordExample />
      </div>
    ),
    code: `"use client";

import { useState } from "react";
import { z } from "zod";
import { AuthForm } from "..";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetpasswordExample() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: ResetPasswordFormValues) {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(true);
    try {
      // Perform the password reset.
      console.log(values);
    } catch (error: any) {
      console.error("Error during password reset:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className={cn("w-[380px]")}>
      <CardContent className="pt-6">
        <AuthForm
          type="RESET_PASSWORD"
          schema={resetPasswordSchema}
          onSubmit={onSubmit}
          defaultValues={{
            password: "",
            confirmPassword: "",
          }}
          loading={isLoading}
          authTitle="Reset Password"
        />
      </CardContent>
    </Card>
  );
}

export default ResetpasswordExample;
`,
  },
  {
    title: "Forgot Password",
    description: "Forgot password form with email verification",
    preview: (
      <div className="w-full max-w-md p-8 bg-background/95 rounded-lg">
        <ForgotpasswordExample />
      </div>
    ),
    code: `"use client";

import { useState } from "react";
import { z } from "zod";
import { AuthForm } from "..";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const forgetPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
export type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;

function ForgotpasswordExample() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: ForgetPasswordFormValues) {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(true);
    try {
      // Perform the password reset.
      console.log(values);
    } catch (error: any) {
      console.error("Error during password reset:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className={cn("w-[380px]")}>
      <CardContent className="pt-6">
        <AuthForm
          type="FORGOT_PASSWORD"
          schema={forgetPasswordSchema}
          onSubmit={onSubmit}
          defaultValues={{
            email: "",
          }}
          loading={isLoading}
          authTitle="Forgot Password"
        />
      </CardContent>
    </Card>
  );
}

export default ForgotpasswordExample;
`,
  },
];

import React from "react";

function AuthFormExamples() {
  return <CodeExamples examples={usageExamples} />;
}

export default AuthFormExamples;
