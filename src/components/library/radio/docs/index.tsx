import { DynamicBreadcrumb } from "@/components/docs/breadcrumb";
import { Accessibility } from "@/components/docs/accessibility";
import { CodeExamples } from "@/components/docs/code-examples";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import Header from "@/components/docs/header";

import { radioGroupProps, radioItemProps } from "./props";
import { accessibilityFeatures } from "./accessibility";
import RadioPageMetadata from "./metadata";
import { usageExamples } from "../examples";
import { packageInfo } from "./package";

export default function RadioGroupDocs() {
  return (
    <div className="container max-w-6xl py-10 space-y-10">
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
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Props</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium">AreaRadioGroup</h3>
            <code className="text-sm text-muted-foreground">
              AreaRadioGroupProps
            </code>
          </div>
          <div className="rounded-lg border">
            <PropsTable definitions={radioGroupProps} />
          </div>
          <p className="text-sm text-muted-foreground">
            Extends{" "}
            <code>
              React.ComponentPropsWithoutRef&lt;typeof RadioGroup.Root&gt;
            </code>
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium">RadioItem</h3>
            <code className="text-sm text-muted-foreground">
              RadioItemProps
            </code>
          </div>
          <div className="rounded-lg border">
            <PropsTable definitions={radioItemProps} />
          </div>
          <p className="text-sm text-muted-foreground">
            Extends{" "}
            <code>
              React.ComponentPropsWithoutRef&lt;typeof RadioGroup.Item&gt;
            </code>
          </p>
        </div>
      </section>

      {/* Accessibility */}
      <section className="">
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <Accessibility features={accessibilityFeatures} />
      </section>
    </div>
  );
}
