"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthCard } from "./auth-card";
import { useState } from "react";

interface AuthFormData {
  email: string;
  password?: string;
}

interface AuthFormProps {
  variant: "signin" | "signup" | "forgot-password";
  onSubmit: (data: AuthFormData) => Promise<void>;
  onSuccess?: (response: unknown) => void;
  providers?: string[];
}

export function AuthForm({
  variant,
  onSubmit,
  onSuccess,
  providers,
}: Readonly<AuthFormProps>) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState(variant);

  const form = useForm<AuthFormData>({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        ...(currentView !== "forgot-password"
          ? { password: z.string().min(8) }
          : {}),
      }),
    ),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
      onSuccess?.(data);
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const titles = {
    signin: "Sign in to your account",
    signup: "Create an account",
    "forgot-password": "Reset your password",
  };

  const descriptions = {
    signin: "Enter your email below to sign in to your account",
    signup: "Enter your details below to create your account",
    "forgot-password":
      "Enter your email address and we'll send you a reset link",
  };

  return (
    <AuthCard
      title={titles[currentView]}
      description={descriptions[currentView]}
      footer={
        <div className="text-sm text-center space-y-2">
          {currentView === "signin" && (
            <p>
              Don&apos;t have an account?{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => setCurrentView("signup")}
              >
                Sign up
              </Button>
            </p>
          )}
          {currentView === "signup" && (
            <p>
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => setCurrentView("signin")}
              >
                Sign in
              </Button>
            </p>
          )}
        </div>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputField
                    placeholder="m@example.com"
                    type="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {currentView !== "forgot-password" && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputField
                      type="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : titles[currentView]}
          </Button>
        </form>
      </Form>

      {currentView === "signin" && (
        <Button
          variant="link"
          className="px-0 mt-2"
          onClick={() => setCurrentView("forgot-password")}
        >
          Forgot password?
        </Button>
      )}

      {providers && providers.length > 0 && (
        <>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {providers.map((provider) => (
              <Button
                key={provider}
                variant="outline"
                type="button"
                disabled={isLoading}
                className="w-full"
              >
                {provider}
              </Button>
            ))}
          </div>
        </>
      )}
    </AuthCard>
  );
}
