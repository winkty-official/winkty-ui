"use client";
import { sampleFiles } from "../data/sample-files";
import { useState } from "react";
import { FileTree } from "..";

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
