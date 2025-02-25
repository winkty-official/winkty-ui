// app/components/app-tray/page.jsx
import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/docs/breadcrumb";
import Header from "@/components/docs/header";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import AppTrayCodeExample from "../example";
import { accessibilityFeatures } from "./accessiblity";
import { packageInfo } from "./package";
import { appTrayIconProps, appTrayProps, appWindowContainerProps, appWindowProps } from "./props";

// Metadata (from previous response)
export const metadata = {
  title: "AppTray Component - Interactive React Dock with Animations",
  description:
    "A customizable React AppTray component featuring smooth Framer Motion animations, Zustand state management, and responsive mouse-tracking effects for modern web applications.",
  keywords: [
    "react app tray",
    "animated dock component",
    "framer motion animations",
    "zustand state management",
    "nextjs components",
    "interactive ui components",
    "react dock menu",
    "web app navigation",
    "mouse tracking effects",
    "modern ui components",
  ],
  // ... rest of the metadata from previous response
};

// Main Docs Page
export default function AppTrayDocs() {
  return (
    <div className="container max-w-6xl space-y-10 py-10">
      <DynamicBreadcrumb />

      <Header
        title="AppTray"
        description="A dynamic application tray component with Framer Motion animations, Zustand state management, and interactive mouse-tracking effects for modern web interfaces."
      />

      {/* Installation */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Installation</h2>
        <Installation {...packageInfo} />
      </section>

      {/* Usage */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold">Usage</h2>
        <AppTrayCodeExample />
      </section>

      {/* Props */}
      <section className="space-y-6">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">AppTray Props</h2>
          <PropsTable definitions={appTrayProps} />
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">AppTrayIcon Props</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Properties for defining individual application icons in the tray.
          </p>
          <PropsTable definitions={appTrayIconProps} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">AppWindow Props</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Properties for configuring the draggable application window component.
          </p>
          <PropsTable definitions={appWindowProps} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">AppWindowContainer Props</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Properties for the container that manages the positioning of application windows.
          </p>
          <PropsTable definitions={appWindowContainerProps} />
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
          <li>Responsive mouse-tracking animations</li>
          <li>Smooth hover and click transitions</li>
          <li>Application state management with Zustand</li>
          <li>Dynamic tooltip display</li>
          <li>Customizable icon sizes and styles</li>
          <li>Minimize/restore functionality</li>
          <li>Tailwind CSS integration</li>
          <li>Performance-optimized animations</li>
        </ul>
      </section>
    </div>
  );
}
