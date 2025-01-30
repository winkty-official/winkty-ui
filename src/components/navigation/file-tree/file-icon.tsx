"use client";

import { FileIcon, FolderIcon } from "lucide-react";

interface FileIconProps {
  type: "file" | "folder";
  className?: string;
}

export function FileTypeIcon({ type, className }: FileIconProps) {
  if (type === "folder") {
    return <FolderIcon className={className} />;
  }
  return <FileIcon className={className} />;
}
