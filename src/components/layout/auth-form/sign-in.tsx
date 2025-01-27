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
  password: z.string().min(1, { message: "Password is required" }),
});

interface SignInProps {
  onSignUp: () => void;
  onForgotPassword: () => void;
  onSuccess: () => void;
}

export function SignIn({ onSignUp, onForgotPassword, onSuccess }: SignInProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Here you would typically send a request to your backend
    console.log("Sign in with", values);
    // Simulate successful sign in
    onSuccess();
  };

  return (
    <AuthCard
      title="Sign in to your account"
      description="Enter your email below to sign in to your account"
      footer={
        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Button variant="link" className="p-0" onClick={onSignUp}>
            Sign up
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
      <Button variant="link" className="px-0 mt-2" onClick={onForgotPassword}>
        Forgot password?
      </Button>
    </AuthCard>
  );
}
