"use client";

import * as React from "react";
import { ChevronRight, Folder, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileTreeProps {
  data: FileNode[];
  onSelect?: (node: FileNode) => void;
  className?: string;
  defaultExpanded?: boolean;
  unstyled?: boolean;
}

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

const FileTree = React.forwardRef<HTMLDivElement, FileTreeProps>(
  (
    { data, onSelect, className, defaultExpanded = false, unstyled = false },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("w-full", className)}>
        <FileTreeNodes
          nodes={data}
          onSelect={onSelect}
          level={0}
          defaultExpanded={defaultExpanded}
          unstyled={unstyled}
        />
      </div>
    );
  }
);
FileTree.displayName = "FileTree";

interface FileTreeNodesProps
  extends Pick<FileTreeProps, "onSelect" | "defaultExpanded" | "unstyled"> {
  nodes: FileNode[];
  level: number;
}

const FileTreeNodes = ({
  nodes,
  onSelect,
  level,
  defaultExpanded,
  unstyled,
}: FileTreeNodesProps) => {
  return (
    <ul className={cn("list-none m-0", level === 0 ? "p-0" : "pl-4")}>
      {nodes.map((node) => (
        <FileTreeNode
          key={node.id}
          node={node}
          onSelect={onSelect}
          level={level}
          defaultExpanded={defaultExpanded}
          unstyled={unstyled}
        />
      ))}
    </ul>
  );
};

interface FileTreeNodeProps
  extends Pick<FileTreeProps, "onSelect" | "defaultExpanded" | "unstyled"> {
  node: FileNode;
  level: number;
}

const FileTreeNode = ({
  node,
  onSelect,
  level,
  defaultExpanded,
  unstyled,
}: FileTreeNodeProps) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const hasChildren = node.type === "folder" && node.children?.length;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onSelect?.(node);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const baseClasses = unstyled
    ? ""
    : cn(
        "flex items-center gap-2 py-1 px-2 rounded-md transition-colors",
        "hover:bg-accent hover:text-accent-foreground cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      );

  return (
    <li>
      <div
        role="button"
        tabIndex={0}
        className={baseClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        <div className="flex items-center gap-1 text-muted-foreground">
          {hasChildren && (
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 transition-transform",
                isExpanded && "rotate-90"
              )}
            />
          )}
          {node.type === "folder" ? (
            <Folder className="h-4 w-4 shrink-0" />
          ) : (
            <File className="h-4 w-4 shrink-0" />
          )}
        </div>
        <span className="truncate">{node.name}</span>
      </div>
      {hasChildren && isExpanded && (
        <FileTreeNodes
          nodes={node.children!}
          onSelect={onSelect}
          level={level + 1}
          defaultExpanded={defaultExpanded}
          unstyled={unstyled}
        />
      )}
    </li>
  );
};

export { FileTree };
export type { FileTreeProps, FileNode };
