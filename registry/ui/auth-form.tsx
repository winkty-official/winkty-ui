import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import InputField from "@/components/ui/input-field";

interface AuthFormProps<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP" | "FORGOT_PASSWORD" | "RESET_PASSWORD";
  onSubmit: (data: T) => void;
  schema: ZodType<T>;
  defaultValues: T;
  authTitle?: string;
  authDescription?: string;
  loading?: boolean;
  providers?: string[];
}

const AuthForm = <T extends FieldValues>({
  type,
  defaultValues,
  onSubmit,
  schema,
  authTitle,
  authDescription,
  loading,
  providers,
}: AuthFormProps<T>) => {
  const isSignIn = type === "SIGN_IN";
  const isForgotPassword = type === "FORGOT_PASSWORD";
  const isSignUp = type === "SIGN_UP";
  const isResetPassword = type === "RESET_PASSWORD";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // State to track whether to show password fields as plain text.
  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    console.log("🚀 ~ handleSubmit ~ data:", data);
    try {
      if (!data) return;
      await onSubmit(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getButtonText = () => {
    if (isSignIn) return "Sign In";
    if (isSignUp) return "Sign Up";
    if (isForgotPassword) return "Send Reset Link";
    if (isResetPassword) return "Reset Password";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="font-semibold tracking-tight">{authTitle}</h2>
        <p className="text-sm text-muted-foreground">{authDescription}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {Object.keys(defaultValues)
            .filter((field) => field !== "rememberMe")
            .map((field) => {
              return (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as Path<T>}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="capitalize">
                        {formField.name}
                      </FormLabel>
                      <FormControl>
                        {["password", "confirmPassword"].includes(
                          formField.name,
                        ) ? (
                          <div className="relative">
                            <InputField
                              // Set type based on whether the field should be visible or hidden.
                              type={
                                showPasswords[formField.name]
                                  ? "text"
                                  : "password"
                              }
                              placeholder="********"
                              className={cn(
                                "bg-white/10 border-white/20 leading-none",
                                {
                                  "pt-2": true,
                                },
                              )}
                              {...formField}
                              InputProps={{
                                endAdornment: (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setShowPasswords((prev) => ({
                                        ...prev,
                                        [formField.name]: !prev[formField.name],
                                      }))
                                    }
                                  >
                                    {showPasswords[formField.name] ? (
                                      <Eye />
                                    ) : (
                                      <EyeClosed />
                                    )}
                                  </button>
                                ),
                              }}
                            />
                          </div>
                        ) : (
                          <InputField
                            type={formField.name === "email" ? "email" : "text"}
                            placeholder={
                              formField.name === "email"
                                ? "user@example.com"
                                : formField.name
                            }
                            className={cn(
                              "bg-white/10 border-white/2 leading-none",
                              {
                                "pt-2": false,
                              },
                            )}
                            {...formField}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full capitalize"
            >
              {getButtonText()}
            </Button>
          </div>

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
                    disabled={loading}
                    className="w-full"
                  >
                    {provider}
                  </Button>
                ))}
              </div>
            </>
          )}

          {/* Forgot Password Link for Sign In Page */}
          {isSignIn && (
            <div className="text-center mt-2">
              <Link
                href="/get-token"
                className="text-secondary-500 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {isSignUp && (
            <div className="text-[9px] font-normal text-muted-foreground text-center">
              By Creating an Account, it means you agree to our Privacy Policy
              and Terms of Service
            </div>
          )}
          <div className="text-center text-sm">
            {(() => {
              if (isSignIn) return "Don't have an account?";
              if (!isResetPassword) return "Already have an account?";
              return "";
            })()}{" "}
            {!isResetPassword ? (
              <Link
                href={isSignIn ? "sign-up" : "/sign-in"}
                className="text-secondary-500 hover:text-secondary-500/90"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </Link>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
};

export { AuthForm };
