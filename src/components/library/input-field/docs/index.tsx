import { DynamicBreadcrumb } from "@/components/docs/breadcrumb";
import { Accessibility } from "@/components/docs/accessibility";
import { CodeExamples } from "@/components/docs/code-examples";
import Header from "@/components/docs/header";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/home/code-block";
import { examples, hookFormUsageCode } from "../examples/index";
import inputAccessibility from "./accessibility";
import InputPageMetadata from "./metadata";
import { packageInfo } from "./package";
import propDefinitions from "./props";

export default function InputDocs() {
  return (
    <div className="container max-w-6xl py-10 space-y-10">
      <div className="space-y-4">
        <DynamicBreadcrumb />
        <Header
          title={InputPageMetadata.title}
          description={InputPageMetadata.description}
        />
      </div>

      {/* Installation */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Installation {...packageInfo} />
      </div>

      {/* Examples */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <CodeExamples examples={examples} />
      </div>

      {/* React Hook Form Integration */}
      <div>
        <h3 className="text-xl font-medium mb-4">
          React Hook Form Integration
        </h3>
        <CodeBlock code={hookFormUsageCode} language="tsx" />
      </div>

      {/* Props Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <PropsTable definitions={propDefinitions} />
      </div>

      {/* Accessibility */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <Accessibility features={inputAccessibility} />
      </div>
    </div>
  );
}
