import ChromaticRippleDocs from "@/components/library/chromatic-ripple-effect/docs";
import ChromaticRippleEffectMetaData from "@/components/library/chromatic-ripple-effect/docs/metadata";
import { Metadata } from "next";

export const metadata: Metadata = ChromaticRippleEffectMetaData;

export default function ChromaticRipplePage() {
  return <ChromaticRippleDocs />;
}
