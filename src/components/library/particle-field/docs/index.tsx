import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/docs/breadcrumb";
import { CodeExamples } from "@/components/docs/code-examples";
import Header from "@/components/docs/header";
import { PropsTable } from "@/components/docs/props-table";
import { usageExamples } from "../examples";
import { accessibilityFeatures } from "./accessibility";
import { propDefinitions } from "./props";
import { packageInfo } from "./package";
import { Installation } from "@/components/docs/installation";

export default function ParticleFieldDocs() {
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
