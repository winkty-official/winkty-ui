import { Metadata } from "next";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { CodeExamples } from "@/components/docs/code-examples";
import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import { propDefinitions } from "./data/props";
import { packageInfo } from "./data/package";
import { accessibilityFeatures } from "./data/accessibility";
import { usageExamples } from "@/components/base/radio/example/examples";
import Header from "@/components/docs/header";
import RadioPageMetadata from "./data/metadata";

export const metadata: Metadata = RadioPageMetadata.meta;

export default function RadioGroupPage() {
  return (
    <div className="container max-w-4xl py-10 space-y-10">
      <DynamicBreadcrumb />

      <Header
        title={RadioPageMetadata.title}
        description={RadioPageMetadata.description}
      />

      {/* Installation */}
      <section className="">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Installation {...packageInfo} />
      </section>

      {/* Usage Examples */}
      <section className="">
        <h2 className="text-2xl font-semibold mb-6">Usage</h2>
        <CodeExamples examples={usageExamples} />
      </section>

      {/* Props */}
      <section className="">
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <PropsTable definitions={propDefinitions} />
      </section>

      {/* Accessibility */}
      <section className="">
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <Accessibility features={accessibilityFeatures} />
      </section>
    </div>
  );
}
