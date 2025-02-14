"use client";
import { DynamicBreadcrumb } from "@/components/docs/breadcrumb";
import { Accessibility } from "@/components/docs/accessibility";
import { CodeExamples } from "@/components/docs/code-examples";
import Header from "@/components/docs/header";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { examples } from "../examples";
import { accessibilityFeatures } from "./accessibility";
import { packageInfo } from "./package";
import { propDefinitions } from "./props";

const PaymentFormDocs = () => {
  return (
    <div className="container max-w-4xl py-10 space-y-10">
      <DynamicBreadcrumb />

      <Header
        title="Payment Form"
        description="A secure and customizable payment form component with credit card validation, live preview, and multiple payment method support."
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Installation {...packageInfo} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Usage</h2>
        <CodeExamples examples={examples} />
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
          <li>Real-time credit card validation</li>
          <li>Interactive card preview with animations</li>
          <li>Support for multiple payment methods</li>
          <li>PCI-DSS compliant form structure</li>
          <li>Comprehensive form validation</li>
          <li>Responsive design</li>
          <li>Dark mode support</li>
          <li>Loading and error states</li>
          <li>TypeScript support</li>
        </ul>
      </section>
    </div>
  );
};

export default PaymentFormDocs;
