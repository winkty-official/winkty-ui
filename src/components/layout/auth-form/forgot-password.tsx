"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthCard } from "./auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

interface ForgotPasswordProps {
  onSignIn: () => void;
  onSuccess: () => void;
}

export function ForgotPassword({ onSignIn, onSuccess }: ForgotPasswordProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Here you would typically send a request to your backend
    console.log("Reset password for", values.email);
    // Simulate successful password reset request
    onSuccess();
  };

  return (
    <AuthCard
      title="Forgot password"
      description="Enter your email address and we will send you a reset link"
      footer={
        <p className="text-sm text-center">
          Remember your password?{" "}
          <Button variant="link" className="p-0" onClick={onSignIn}>
            Sign in
          </Button>
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
