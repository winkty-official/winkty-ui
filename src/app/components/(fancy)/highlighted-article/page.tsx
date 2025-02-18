import HighlightedArticleDocs from "@/components/library/highlighted-article/docs";
import { HeiglightedArticleMetaData } from "@/components/library/highlighted-article/docs/metadata";
import { Metadata } from "next";

export const metadata: Metadata = HeiglightedArticleMetaData;

export default function HighlightedArticlePage() {
  return <HighlightedArticleDocs />;
}
