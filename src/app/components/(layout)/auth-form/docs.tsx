"use client";

import { CodeBlock } from "@/components/home/code-block";
import { ForgotPassword } from "@/components/layout/auth-form/forgot-password";
import { SignIn } from "@/components/layout/auth-form/sign-in";
import { SignUp } from "@/components/layout/auth-form/sign-up";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthDocs() {
  return (
    <div className="container py-10 max-w-7xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Authentication Components</h1>
          <p className="text-muted-foreground mt-2">
            A collection of authentication forms built with shadcn/ui components
            and React Hook Form.
          </p>
        </div>

        <div className="grid gap-10">
          {/* Installation */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Installation</h2>
            <p className="text-muted-foreground mb-4">
              First, install the required dependencies:
            </p>
            <CodeBlock
              language="bash"
              code={`npm install @hookform/resolvers zod react-hook-form`}
            />
          </section>

          {/* CLI Installation */}
          <section>
            <h2 className="text-2xl font-bold mb-4">CLI Installation</h2>
            <p className="text-muted-foreground mb-4">
              Install components directly from our registry:
            </p>
            <div className="space-y-4">
              <CodeBlock
                language="bash"
                code={`# Install auth forms
npx auth-components add https://your-domain.com/components/auth-form.json`}
              />

              <p className="text-sm text-muted-foreground">
                This will automatically:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Install all required dependencies</li>
                <li>Create component files in your project</li>
                <li>Set up necessary configurations</li>
              </ul>
            </div>
          </section>

          {/* Usage */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Usage</h2>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="space-y-8">
                <div className="flex flex-col items-center gap-8">
                  <SignIn
                    onSignUp={() => {}}
                    onForgotPassword={() => {}}
                    onSuccess={() => {}}
                  />
                  <SignUp onSignIn={() => {}} onSuccess={() => {}} />
                  <ForgotPassword onSignIn={() => {}} onSuccess={() => {}} />
                </div>
              </TabsContent>
              <TabsContent value="code">
                <div className="space-y-8">
                  <CodeBlock
                    language="tsx"
                    code={`import { SignIn } from "@/components/auth-form/sign-in"
import { SignUp } from "@/components/auth-form/sign-up"
import { ForgotPassword } from "@/components/auth-form/forgot-password"

// Sign In Form
<SignIn
  onSignUp={() => console.log("Navigate to sign up")}
  onForgotPassword={() => console.log("Navigate to forgot password")}
  onSuccess={() => console.log("Sign in success")}
/>

// Sign Up Form
<SignUp
  onSignIn={() => console.log("Navigate to sign in")}
  onSuccess={() => console.log("Sign up success")}
/>

// Forgot Password Form
<ForgotPassword
  onSignIn={() => console.log("Navigate to sign in")}
  onSuccess={() => console.log("Password reset email sent")}
/>`}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Props Documentation */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Props</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">SignIn</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code>onSignUp: () ={">"} void</code> - Callback when user
                    clicks sign up link
                  </li>
                  <li>
                    <code>onForgotPassword: () ={">"} void</code> - Callback
                    when user clicks forgot password
                  </li>
                  <li>
                    <code>onSuccess: () ={">"} void</code> - Callback after
                    successful sign in
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">SignUp</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code>onSignIn: () ={">"} void</code> - Callback when user
                    clicks sign in link
                  </li>
                  <li>
                    <code>onSuccess: () ={">"} void</code> - Callback after
                    successful sign up
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">ForgotPassword</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code>onSignIn: () ={">"} void</code> - Callback when user
                    clicks sign in link
                  </li>
                  <li>
                    <code>onSuccess: () ={">"} void</code> - Callback after
                    successful password reset request
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Built with shadcn/ui components</li>
              <li>Form validation using Zod and React Hook Form</li>
              <li>Responsive design</li>
              <li>Accessible forms with proper ARIA labels</li>
              <li>TypeScript support</li>
              <li>Customizable callbacks for all actions</li>
              <li>Consistent styling with your application theme</li>
            </ul>
          </section>

          {/* Customization */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Customization</h2>
            <p className="text-muted-foreground mb-4">
              The authentication components use the AuthCard component which can
              be customized:
            </p>
            <CodeBlock
              language="tsx"
              code={`interface AuthCardProps {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}`}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
