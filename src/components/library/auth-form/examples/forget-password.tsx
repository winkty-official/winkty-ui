"use client";

import { useState } from "react";
import { z } from "zod";
import { AuthForm } from "@/components/ui/auth-form";
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
