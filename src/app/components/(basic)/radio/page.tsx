import RadioPageMetadata from "@/components/library/radio/docs/metadata";
import RadioGroupDocs from "@/components/library/radio/docs";
import { Metadata } from "next";

export const metadata: Metadata = RadioPageMetadata.meta;

export default function RadioGroupPage() {
  return <RadioGroupDocs />;
}
