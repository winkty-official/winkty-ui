import { Metadata } from "next";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import { asyncAutocompleteProps } from "./data/props";
import { packageInfo } from "./data/package";
import { accessibilityFeatures } from "./data/accessibility";

import Header from "@/components/docs/header";

import AutoCompleteCodeExample from "@/components/base/autocomplete/examples";

export const metadata: Metadata = {
  title: "Async Autocomplete - UI Components",
  description:
    "An asynchronous autocomplete component with search functionality and keyboard navigation.",
};

export default function AutocompletePage() {
  return (
    <div className="container max-w-4xl py-10 space-y-10">
      <DynamicBreadcrumb />

      <Header
        title="Async Autocomplete"
        description="A flexible autocomplete component that supports asynchronous data loading, search functionality, and keyboard navigation."
      />

      {/* Installation */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Installation {...packageInfo} />
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Usage</h2>
        <AutoCompleteCodeExample />
      </section>

      {/* Props */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <PropsTable definitions={asyncAutocompleteProps} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <Accessibility features={accessibilityFeatures} />
      </section>
    </div>
  );
}
