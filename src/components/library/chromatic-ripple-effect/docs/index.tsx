import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/docs/breadcrumb";
import { CodeExamples } from "@/components/docs/code-examples";
import Header from "@/components/docs/header";
import { PropsTable } from "@/components/docs/props-table";
import { usageExamples } from "@/components/library/chromatic-ripple-effect/examples";
import { accessibilityFeatures } from "./accessibility";
import {
  mouseRippleEffectProps,
  textAndMouseRippleEffectProps,
  textHoverEffectProps,
} from "./props";

export default function ChromaticRippleDocs() {
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

        <h3 className="text-xl font-semibold mb-4">Text & Mouse Ripple Effect</h3>
        <PropsTable definitions={textAndMouseRippleEffectProps} className=" mb-6" />

        <h3 className="text-xl font-semibold mb-4">Mouse Ripple Effect</h3>
        <PropsTable definitions={mouseRippleEffectProps} className=" mb-6" />

        <h3 className="text-xl font-semibold mb-4">Text Hover Effect</h3>
        <PropsTable definitions={textHoverEffectProps} />
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
