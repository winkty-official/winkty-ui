import InputDocs from "@/components/library/input-field/docs";
import InputMetaData from "@/components/library/input-field/docs/metadata";
import { Metadata } from "next";

export const metadata: Metadata = InputMetaData.meta;

export default function InputPage() {
  return <InputDocs />;
}
