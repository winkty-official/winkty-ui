import { Metadata } from "next";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import { packageInfo } from "./data/package";
import { accessibilityFeatures } from "./data/accessibility";
import Header from "@/components/docs/header";
import FileTreeCodeExample from "@/components/navigation/file-tree/examples";
import { fileTreeProps, fileNodeProps, treeNodeProps } from "./data/props";

export const metadata: Metadata = {
  title: "FileTree - UI Components",
  description:
    "A highly customizable file tree component for displaying hierarchical file and folder structures. Supports expandable nodes, selection modes, keyboard navigation, and dynamic content loading. Perfect for file explorers, directory browsers, and nested data visualization.",
  keywords: [
    "file tree",
    "directory tree",
    "hierarchical data",
    "file explorer",
    "folder structure",
    "UI component",
    "React component",
    "keyboard navigation",
    "customizable file tree",
    "Tailwind CSS",
  ],
  authors: [
    {
      name: "Rabin | Avinash",
      url: process.env.BASE_URI,
    },
  ],
  openGraph: {
    title: "FileTree - UI Components",
    description:
      "A highly customizable file tree component for displaying hierarchical file and folder structures. Supports expandable nodes, selection modes, keyboard navigation, and dynamic content loading.",
    type: "website",
    url: `${process.env.BASE_URI}/components/file-tree`,
    images: [
      {
        url: `${process.env.BASE_URI}/components-img/file-tree-preview.png`,
        alt: "FileTree Component Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FileTree - UI Components",
    description:
      "A highly customizable file tree component for displaying hierarchical file and folder structures. Supports expandable nodes, selection modes, keyboard navigation, and dynamic content loading.",
    images: [`${process.env.BASE_URI}/components-img/file-tree-preview.png`],
  },
};

export default function FileTreePage() {
  return (
    <div className="container max-w-4xl py-10 space-y-10">
      <DynamicBreadcrumb />

      <Header
        title="File Tree"
        description="A customizable file tree component for displaying hierarchical file and folder structures with support for selection, icons, and keyboard navigation."
      />

      {/* Installation */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Installation {...packageInfo} />
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Usage</h2>
        <FileTreeCodeExample />
      </section>

      {/* Props */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">FileTree Props</h2>
          <PropsTable definitions={fileTreeProps} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">FileNode Props</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Properties for defining file and folder nodes in the tree structure.
          </p>
          <PropsTable definitions={fileNodeProps} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">TreeNode Props</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Internal component props for rendering individual tree nodes.
          </p>
          <PropsTable definitions={treeNodeProps} />
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <Accessibility features={accessibilityFeatures} />
      </section>

      {/* Additional Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Hierarchical file and folder structure display</li>
          <li>Expandable/collapsible folders</li>
          <li>File and folder selection</li>
          <li>Path-based selection tracking</li>
          <li>Customizable file/folder icons</li>
          <li>Smooth animations and transitions</li>
          <li>Full keyboard navigation support</li>
          <li>Customizable styling with Tailwind CSS</li>
        </ul>
      </section>
    </div>
  );
}
