import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import { Accessibility } from "@/components/docs/accessibility";
import { CodeExamples } from "@/components/docs/code-examples";
import Header from "@/components/docs/header";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/home/code-block";
import { Metadata } from "next";
import inputAccessibility from "./data/accessibility";
import { examples, hookFormUsageCode } from "./data/examples";
import InputPageMetadata from "./data/metadata";
import { packageInfo } from "./data/package";
import propDefinitions from "./data/props";

export const metadata: Metadata = InputPageMetadata.meta;

export default function InputPage() {
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
