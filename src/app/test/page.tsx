"use client";

import {
  FileNode,
  FileTree,
} from "@/components/navigation/file-tree/file-tree-new";

const demoData: FileNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        children: [
          { id: "3", name: "Button.tsx", type: "file" },
          { id: "4", name: "Card.tsx", type: "file" },
        ],
      },
      {
        id: "5",
        name: "pages",
        type: "folder",
        children: [
          { id: "6", name: "index.tsx", type: "file" },
          { id: "7", name: "about.tsx", type: "file" },
        ],
      },
      { id: "8", name: "styles.css", type: "file" },
    ],
  },
  {
    id: "9",
    name: "public",
    type: "folder",
    children: [
      { id: "10", name: "favicon.ico", type: "file" },
      { id: "11", name: "logo.svg", type: "file" },
    ],
  },
];

export default function Home() {
  const handleSelect = (node: FileNode) => {
    console.log("Selected:", node.name);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">
          File Explorer
        </h1>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <FileTree
            data={demoData}
            onSelect={handleSelect}
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
}
