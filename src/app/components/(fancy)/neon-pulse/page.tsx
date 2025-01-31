import { Metadata } from "next";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { CodeExamples } from "@/components/docs/code-examples";
import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import { propDefinitions } from "./data/props";
import { packageInfo } from "./data/package";
import { accessibilityFeatures } from "./data/accessibility";
import { usageExamples } from "./data/examples";
import Header from "@/components/docs/header";

export const metadata: Metadata = {
  title: "Neon Pulse - UI Components",
  description:
    "A customizable neon text effect component with smooth pulsing animations.",
};

export default function NeonPulsePage() {
  return (
    <div className="container max-w-4xl py-10 space-y-10">
      <DynamicBreadcrumb />

      <Header
        title="Neon Pulse"
        description="Create eye-catching neon text effects with customizable colors, animations, and glow intensity."
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Installation {...packageInfo} />
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
          <li>Smooth pulsing neon glow effect</li>
          <li>Customizable text and glow colors</li>
          <li>Adjustable animation timing</li>
          <li>Letter-by-letter animation option</li>
          <li>Responsive text sizing</li>
          <li>Optimized performance with Framer Motion</li>
        </ul>
      </section>
    </div>
  );
}
