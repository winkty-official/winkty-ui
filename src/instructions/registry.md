# generate a registry of components

## example of a registry

```json
{
  "name": "simple-input",
  "dependencies": ["@radix-ui/react-icons", "class-variance-authority"],
  "files": [
    {
      "name": "simple-input.tsx",
      "content": "// Content of your SimpleInput component",
      "dir": "components/base/inputs"
    }
  ]
}
```

```json
{
  "name": "auth-form",
  "type": "registry:ui",
  "dependencies": ["@hookform/resolvers", "zod", "react-hook-form"],
  "files": [
    {
      "path": "components/auth-form/auth-card.tsx",
      "content": "import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from \"@/components/ui/card\";\nimport { cn } from \"@/lib/utils\";\n\ninterface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {\n  title: string;\n  description?: string;\n  footer?: React.ReactNode;\n  children: React.ReactNode;\n}\n\nexport function AuthCard({ title, description, footer, children, className, ...props }: AuthCardProps) {\n  return (\n    <Card className={cn(\"w-[380px]\", className)} {...props}>\n      <CardHeader>\n        <CardTitle>{title}</CardTitle>\n        {description && <CardDescription>{description}</CardDescription>}\n      </CardHeader>\n      <CardContent>{children}</CardContent>\n      {footer && <CardFooter>{footer}</CardFooter>}\n    </Card>\n  );\n}",
      "type": "registry:ui",
      "target": "components/auth-form/auth-card.tsx"
    },
    {
      "path": "components/auth-form/sign-in.tsx",
      "content": "\"use client\";\n\nimport { useState } from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { zodResolver } from \"@hookform/resolvers/zod\";\nimport * as z from \"zod\";\nimport { AuthCard } from \"./auth-card\";\nimport { Button } from \"@/components/ui/button\";\nimport { Input } from \"@/components/ui/input\";\nimport { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from \"@/components/ui/form\";\n\nconst formSchema = z.object({\n  email: z.string().email({ message: \"Invalid email address\" }),\n  password: z.string().min(1, { message: \"Password is required\" }),\n});\n\ninterface SignInProps {\n  onSignUp: () => void;\n  onForgotPassword: () => void;\n  onSuccess: () => void;\n}\n\nexport function SignIn({ onSignUp, onForgotPassword, onSuccess }: SignInProps) {\n  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { email: \"\", password: \"\" } });\n\n  const onSubmit = (values: z.infer<typeof formSchema>) => {\n    console.log(\"Sign in with\", values);\n    onSuccess();\n  };\n\n  return (\n    <AuthCard\n      title=\"Sign in to your account\"\n      description=\"Enter your email below to sign in to your account\"\n      footer={\n        <p className=\"text-sm text-center\">\n          Don't have an account?{\" \"}\n          <Button variant=\"link\" className=\"p-0\" onClick={onSignUp}>\n            Sign up\n          </Button>\n        </p>\n      }\n    >\n      <Form {...form}>\n        <form onSubmit={form.handleSubmit(onSubmit)} className=\"space-y-4\">\n          <FormField\n            control={form.control}\n            name=\"email\"\n            render={({ field }) => (\n              <FormItem>\n                <FormLabel>Email</FormLabel>\n                <FormControl>\n                  <Input placeholder=\"m@example.com\" {...field} />\n                </FormControl>\n                <FormMessage />\n              </FormItem>\n            )}\n          />\n          <FormField\n            control={form.control}\n            name=\"password\"\n            render={({ field }) => (\n              <FormItem>\n                <FormLabel>Password</FormLabel>\n                <FormControl>\n                  <Input type=\"password\" {...field} />\n                </FormControl>\n                <FormMessage />\n              </FormItem>\n            )}\n          />\n          <Button type=\"submit\" className=\"w-full\">Sign In</Button>\n        </form>\n      </Form>\n      <Button variant=\"link\" className=\"px-0 mt-2\" onClick={onForgotPassword}>\n        Forgot password?\n      </Button>\n    </AuthCard>\n  );\n}",
      "type": "registry:ui",
      "target": "components/auth-form/sign-in.tsx"
    },
    {
      "path": "components/auth-form/sign-up.tsx",
      "content": "\"use client\";\n\nimport { useState } from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { zodResolver } from \"@hookform/resolvers/zod\";\nimport * as z from \"zod\";\nimport { AuthCard } from \"./auth-card\";\nimport { Button } from \"@/components/ui/button\";\nimport { Input } from \"@/components/ui/input\";\nimport { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from \"@/components/ui/form\";\n\nconst formSchema = z.object({\n  email: z.string().email({ message: \"Invalid email address\" }),\n  password: z.string().min(8, { message: \"Password must be at least 8 characters\" }),\n});\n\ninterface SignUpProps {\n  onSignIn: () => void;\n  onSuccess: () => void;\n}\n\nexport function SignUp({ onSignIn, onSuccess }: SignUpProps) {\n  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { email: \"\", password: \"\" } });\n\n  const onSubmit = (values: z.infer<typeof formSchema>) => {\n    console.log(\"Sign up with\", values);\n    onSuccess();\n  };\n\n  return (\n    <AuthCard\n      title=\"Create an account\"\n      description=\"Enter your email below to create your account\"\n      footer={\n        <p className=\"text-sm text-center\">\n          Already have an account?{\" \"}\n          <Button variant=\"link\" className=\"p-0\" onClick={onSignIn}>\n            Sign in\n          </Button>\n        </p>\n      }\n    >\n      <Form {...form}>\n        <form onSubmit={form.handleSubmit(onSubmit)} className=\"space-y-4\">\n          <FormField\n            control={form.control}\n            name=\"email\"\n            render={({ field }) => (\n              <FormItem>\n                <FormLabel>Email</FormLabel>\n                <FormControl>\n                  <Input placeholder=\"m@example.com\" {...field} />\n                </FormControl>\n                <FormMessage />\n              </FormItem>\n            )}\n          />\n          <FormField\n            control={form.control}\n            name=\"password\"\n            render={({ field }) => (\n              <FormItem>\n                <FormLabel>Password</FormLabel>\n                <FormControl>\n                  <Input type=\"password\" {...field} />\n                </FormControl>\n                <FormMessage />\n              </FormItem>\n            )}\n          />\n          <Button type=\"submit\" className=\"w-full\">Sign Up</Button>\n        </form>\n      </Form>\n    </AuthCard>\n  );\n}",
      "type": "registry:ui",
      "target": "components/auth-form/sign-up.tsx"
    },
    {
      "path": "components/auth-form/forgot-password.tsx",
      "content": "\"use client\";\n\nimport { useState } from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { zodResolver } from \"@hookform/resolvers/zod\";\nimport * as z from \"zod\";\nimport { AuthCard } from \"./auth-card\";\nimport { Button } from \"@/components/ui/button\";\nimport { Input } from \"@/components/ui/input\";\nimport { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from \"@/components/ui/form\";\n\nconst formSchema = z.object({\n  email: z.string().email({ message: \"Invalid email address\" }),\n});\n\ninterface ForgotPasswordProps {\n  onSignIn: () => void;\n  onSuccess: () => void;\n}\n\nexport function ForgotPassword({ onSignIn, onSuccess }: ForgotPasswordProps) {\n  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { email: \"\" } });\n\n  const onSubmit = (values: z.infer<typeof formSchema>) => {\n    console.log(\"Reset password for\", values.email);\n    onSuccess();\n  };\n\n  return (\n    <AuthCard\n      title=\"Forgot password\"\n      description=\"Enter your email address and we will send you a reset link\"\n      footer={\n        <p className=\"text-sm text-center\">\n          Remember your password?{\" \"}\n          <Button variant=\"link\" className=\"p-0\" onClick={onSignIn}>\n            Sign in\n          </Button>\n        </p>\n      }\n    >\n      <Form {...form}>\n        <form onSubmit={form.handleSubmit(onSubmit)} className=\"space-y-4\">\n          <FormField\n            control={form.control}\n            name=\"email\"\n            render={({ field }) => (\n              <FormItem>\n                <FormLabel>Email</FormLabel>\n                <FormControl>\n                  <Input placeholder=\"m@example.com\" {...field} />\n                </FormControl>\n                <FormMessage />\n              </FormItem>\n            )}\n          />\n          <Button type=\"submit\" className=\"w-full\">Send reset link</Button>\n        </form>\n      </Form>\n    </AuthCard>\n  );\n}",
      "type": "registry:ui",
      "target": "components/auth-form/forgot-password.tsx"
    }
  ],
  "author": "Rabin Karmakar <hi@rabinkarmakar.com>",
  "title": "Authentication Forms"
}
```
