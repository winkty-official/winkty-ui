import { Metadata } from "next";

import AutocompleteDocs from "@/components/library/auto-complete/docs";

export const metadata: Metadata = {
  title: "Async Autocomplete - UI Components",
  description:
    "An asynchronous autocomplete component with search functionality and keyboard navigation.",
};

export default function AutocompletePage() {
  return <AutocompleteDocs />;
}
