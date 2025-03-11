import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/docs/breadcrumb";
import { packageInfo } from "./package";
import { accessibilityFeatures } from "./accessibility";
import Header from "@/components/docs/header";
import { propDefinitions } from "./props";
import FloatingCardCodeExample from "../examples";

export default function FloatingCardDocs() {
  return (
    <div className="container max-w-6xl space-y-10 py-10">
      <DynamicBreadcrumb />

      <Header
        title="Floating Card"
        description="A floating card component with 3D hover effects, smooth spring animations, and flexible content structure for displaying features or content."
      />

      {/* Installation */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Installation</h2>
        <Installation {...packageInfo} />
      </section>

      {/* Usage */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold">Usage</h2>
        <FloatingCardCodeExample />
      </section>

      {/* Props */}
      <section className="space-y-6">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">FloatingCard Props</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Properties for configuring the floating card component&apos;s appearance
            and behavior.
          </p>
          <PropsTable definitions={propDefinitions} />
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Accessibility</h2>
        <Accessibility features={accessibilityFeatures} />
      </section>

      {/* Additional Features */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Features</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>3D hover effects with mouse tracking</li>
          <li>Smooth spring-based animations</li>
          <li>Customizable gradient backgrounds</li>
          <li>Viewport-based entrance animations</li>
          <li>Flexible content layout</li>
          <li>Disabled state support</li>
          <li>Custom ARIA label support</li>
          <li>Responsive design compatibility</li>
        </ul>
      </section>
    </div>
  );
}
