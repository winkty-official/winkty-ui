"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileNode } from "./type/file";
import { FileTypeIcon } from "./file-icon";

interface TreeNodeProps {
  node: FileNode;
  level?: number;
  basePath: string;
  selectedPath: string;
  onSelect: (path: string) => void;
}

export function TreeNode({
  node,
  level = 0,
  basePath,
  selectedPath,
  onSelect,
}: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedPath === basePath;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(basePath);
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <motion.div
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer relative group",
          level > 0 && `ml-${level * 4}`
        )}
        onClick={handleClick}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 rounded-lg bg-primary/10"
          initial={false}
          animate={{
            opacity: isSelected ? 1 : 0,
            scale: isSelected ? 1 : 0.95,
          }}
          transition={{ duration: 0.2 }}
        />
        <div className="flex items-center gap-2 relative">
          <div className="w-4 flex items-center">
            {hasChildren && (
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            )}
          </div>
          <div className="w-4 flex items-center">
            <FileTypeIcon
              type={node.type}
              className={cn(
                "h-4 w-4",
                node.type === "folder" ? "text-blue-500" : "text-gray-500"
              )}
            />
          </div>
          <span
            className={cn("text-sm", node.type === "folder" && "font-medium")}
          >
            {node.name}
          </span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children?.map((child, index) => (
              <TreeNode
                key={`${child.name}-${index}`}
                node={child}
                level={level + 1}
                basePath={`${basePath}/${child.name}`}
                selectedPath={selectedPath}
                onSelect={onSelect}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
