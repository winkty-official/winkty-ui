import { Metadata } from "next";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { CodeExamples } from "@/components/docs/code-examples";
import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import { propDefinitions } from "./data/props";
import { packageInfo } from "./data/package";
import { accessibilityFeatures } from "./data/accessibility";
import { usageExamples } from "@/components/base/radio/examples";

export const metadata: Metadata = {
  title: "Area Radio Group - UI Components",
  description:
    "A flexible and accessible radio group component with rich content support.",
};

export default function RadioGroupPage() {
  return (
    <div className="container max-w-4xl py-10">
      <DynamicBreadcrumb />

      {/* Installation */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Installation {...packageInfo} />
      </section>

      {/* Usage Examples */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Usage</h2>
        <CodeExamples examples={usageExamples} />
      </section>

      {/* Props */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <PropsTable definitions={propDefinitions} />
      </section>

      {/* Accessibility */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <Accessibility features={accessibilityFeatures} />
      </section>
    </div>
  );
}
