"use client";

import { z } from "zod";
import { AuthForm } from "@/components/ui/auth-form";
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
