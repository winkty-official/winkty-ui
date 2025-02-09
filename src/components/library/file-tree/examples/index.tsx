"use client";
import {
  CodeExamples,
  type CodeExample,
} from "@/components/docs/code-examples";
import { FileTree } from "..";
import { ActiveSelectFileTreeExample } from "./active-selected-file-tree";
import { sampleFiles } from "../data/sample-files";

export const usageExamples: CodeExample[] = [
  {
    title: "Basic File Tree",
    description: "A simple file tree with files and folders",
    preview: <ActiveSelectFileTreeExample />,
    code: `"use client";
import { sampleFiles } from "@/components/navigation/file-tree/type/file";
import { useState } from "react";
import { FileTree } from "@/components/ui/file-tree";

export function ActiveSelectFileTreeExample() {
  const [selectedFile, setSelectedFile] = useState<string>("");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">File Explorer</h1>
      <div className="grid grid-cols-1 gap-4">
        <FileTree
          files={sampleFiles}
          className="max-w-2xl"
          activeSelect={selectedFile}
          onSelect={setSelectedFile}
        />
        {selectedFile && (
          <p className="text-sm text-muted-foreground">
            Selected: {selectedFile}
          </p>
        )}
      </div>
    </div>
  );
}
`,
  },
  {
    title: "Simple File Tree",
    description: "Basic file tree without selection",
    preview: <FileTree files={sampleFiles} className="max-w-2xl" />,
    code: `export function SimpleFileTreeExample() {
  return (
    <div className="container mx-auto py-8">
        <FileTree
          files={sampleFiles}
          className="max-w-2xl"
        />
    </div>
  );
}`,
  },
];

export default function FileTreeCodeExample() {
  return <CodeExamples examples={usageExamples} />;
}
