"use client";

import { Card } from "@/components/ui/card";
import { FileNode } from "./type/file";
import { TreeNode } from "./tree-node";
import { useState } from "react";

interface FileTreeProps {
  files: FileNode[];
  className?: string;
  activeSelect?: string;
  onSelect?: (path: string) => void;
}

export function FileTree({
  files,
  className,
  activeSelect,
  onSelect,
}: FileTreeProps) {
  const [selectedPath, setSelectedPath] = useState<string>(activeSelect || "");

  const handleSelect = (path: string) => {
    setSelectedPath(path);
    onSelect?.(path);
  };

  return (
    <Card className={className}>
      <div className="p-4">
        {files.map((file, index) => (
          <TreeNode
            key={`${file.name}-${index}`}
            node={file}
            basePath={file.name}
            selectedPath={selectedPath}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </Card>
  );
}
