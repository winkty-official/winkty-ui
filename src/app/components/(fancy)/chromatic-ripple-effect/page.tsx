import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import { Accessibility } from "@/components/docs/accessibility";
import { CodeExamples } from "@/components/docs/code-examples";
import Header from "@/components/docs/header";
import { PropsTable } from "@/components/docs/props-table";
import { Metadata } from "next";
import { accessibilityFeatures } from "./data/accessibility";
import { usageExamples } from "./data/examples";
import { propDefinitions } from "./data/props";

export const metadata: Metadata = {
  title: "Chromatic Ripple Effect - UI Components",
  description:
    "An interactive text component that creates smooth ripple animations on mouse movement.",
};

export default function ChromaticRipplePage() {
  return (
    <div className="container max-w-4xl py-10 space-y-10">
      <DynamicBreadcrumb />

      <Header
        title="Chromatic Ripple Effect"
        description="Create engaging interactive text with smooth ripple animations that follow mouse movement."
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        {/* <Installation {...packageInfo} /> */}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Usage</h2>
        <CodeExamples examples={usageExamples} />
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
          <li>Smooth ripple animations on mouse movement</li>
          <li>Customizable ripple colors and sizes</li>
          <li>Adjustable animation timing</li>
          <li>Per-character hover animations</li>
          <li>Responsive and mobile-friendly</li>
          <li>Optimized performance with Framer Motion</li>
        </ul>
      </section>
    </div>
  );
}
