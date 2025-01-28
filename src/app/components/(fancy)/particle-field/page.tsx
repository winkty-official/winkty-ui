import { Metadata } from "next";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { CodeExamples } from "@/components/docs/code-examples";
import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import { propDefinitions } from "./data/props";
import { packageInfo } from "./data/package";
import { accessibilityFeatures } from "./data/accessibility";
import Header from "@/components/docs/header";
import { usageExamples } from "./data/examples";

export const metadata: Metadata = {
  title: "Particle Field - UI Components",
  description:
    "An interactive particle field animation component with customizable properties.",
  keywords: ["particle field", "interactive", "animation", "customizable"],
};

export default function ParticleFieldPage() {
  return (
    <div className="container max-w-4xl py-10 space-y-10">
      <DynamicBreadcrumb />

      <Header
        title="Particle Field"
        description="A customizable particle field animation component that creates an interactive background effect."
      />

      {/* Installation */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Installation {...packageInfo} />
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Usage</h2>
        <CodeExamples examples={usageExamples} />
      </section>

      {/* Props */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <PropsTable definitions={propDefinitions} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <Accessibility features={accessibilityFeatures} />
      </section>
    </div>
  );
}
