import { Metadata } from "next";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import { propDefinitions } from "./data/props";
import { packageInfo } from "./data/package";
import { accessibilityFeatures } from "./data/accessibility";
import Header from "@/components/docs/header";
import AuthIndex from ".";

export const metadata: Metadata = {
  title: "Auth Form - UI Components",
  description:
    "A flexible authentication form component with multiple variants and OAuth support.",
  keywords: [
    "authentication",
    "login form",
    "signup form",
    "password reset",
    "OAuth",
    "form validation",
    "React component",
    "TypeScript",
  ],
};

export default function AuthFormPage() {
  return (
    <div className="container max-w-4xl py-10 space-y-10">
      <DynamicBreadcrumb />

      <Header
        title="Auth Form"
        description="A comprehensive authentication form component with sign in, sign up, and password reset variants. Includes OAuth provider support and form validation."
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Installation {...packageInfo} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Usage</h2>
        <AuthIndex />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <PropsTable definitions={propDefinitions} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <Accessibility features={accessibilityFeatures} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Multiple form variants (sign in, sign up, password reset)</li>
          <li>OAuth provider integration</li>
          <li>Form validation with react-hook-form</li>
          <li>Customizable styling with Tailwind CSS</li>
          <li>Loading and error states</li>
          <li>TypeScript support</li>
          <li>Responsive design</li>
          <li>Dark mode support</li>
        </ul>
      </section>
    </div>
  );
}
