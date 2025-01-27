"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthDocs from "./docs";
import { SignUp } from "@/components/layout/auth-form/sign-up";
import { SignIn } from "@/components/layout/auth-form/sign-in";
import { ForgotPassword } from "@/components/layout/auth-form/forgot-password";

type AuthState = "signUp" | "signIn" | "forgotPassword" | "success";

export default function AuthPage() {
  const [authState, setAuthState] = useState<AuthState>("signIn");

  const handleSuccess = (message: string) => {
    console.log("🚀 ~ handleSuccess ~ message:", message);
    // toast({
    //   title: "Success",
    //   description: message,
    // });
    setAuthState("success");
  };

  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="demo" className="w-full">
        <div className="container flex justify-center py-4">
          <TabsList>
            <TabsTrigger value="demo">Demo</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="demo">
          <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
            {authState === "signUp" && (
              <SignUp
                onSignIn={() => setAuthState("signIn")}
                onSuccess={() =>
                  handleSuccess(
                    "Account created successfully. Please check your email for verification."
                  )
                }
              />
            )}
            {authState === "signIn" && (
              <SignIn
                onSignUp={() => setAuthState("signUp")}
                onForgotPassword={() => setAuthState("forgotPassword")}
                onSuccess={() => handleSuccess("Signed in successfully.")}
              />
            )}
            {authState === "forgotPassword" && (
              <ForgotPassword
                onSignIn={() => setAuthState("signIn")}
                onSuccess={() =>
                  handleSuccess(
                    "Password reset link sent. Please check your email."
                  )
                }
              />
            )}
            {authState === "success" && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Authentication Successful
                </h2>
                <p className="mb-4">You have successfully authenticated.</p>
                <Button onClick={() => setAuthState("signIn")}>
                  Back to Sign In
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="docs">
          <AuthDocs />
        </TabsContent>
      </Tabs>
    </div>
  );
}
