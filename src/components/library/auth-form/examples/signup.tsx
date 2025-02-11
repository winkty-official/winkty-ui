/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { z } from "zod";
import { AuthForm } from "@/components/ui/auth-form";
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
