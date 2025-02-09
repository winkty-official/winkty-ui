import FileTreeDocs from "@/components/library/file-tree/docs";
import { FileTreeMetaData } from "@/components/library/file-tree/docs/metadata";
import { Metadata } from "next";

export const metadata: Metadata = FileTreeMetaData;

export default function FileTreePage() {
  return <FileTreeDocs />;
}
