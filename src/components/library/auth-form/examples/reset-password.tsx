"use client";

import { useState } from "react";
import { z } from "zod";
import { AuthForm } from "@/components/ui/auth-form";
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
    } catch (error: unknown) {
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
