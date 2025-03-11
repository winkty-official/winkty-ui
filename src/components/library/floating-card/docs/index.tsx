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
        <div className="container max-w-6xl py-10 space-y-10">
            <DynamicBreadcrumb />

            <Header
                title="Floating Card"
                description="A floating card component with 3D hover effects, smooth spring animations, and flexible content structure for displaying features or content."
            />

            {/* Installation */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Installation</h2>
                <Installation {...packageInfo} />
            </section>

            {/* Usage */}
            <section>
                <h2 className="text-2xl font-semibold mb-6">Usage</h2>
                <FloatingCardCodeExample />
            </section>

            {/* Props */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">FloatingCard Props</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        Properties for configuring the floating card component's appearance and behavior.
                    </p>
                    <PropsTable definitions={propDefinitions} />
                </div>
            </section>

            {/* Accessibility */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
                <Accessibility features={accessibilityFeatures} />
            </section>

            {/* Additional Features */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
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