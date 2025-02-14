import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/docs/breadcrumb";
import { packageInfo } from "./package";
import { accessibilityFeatures } from "./accessibility";
import Header from "@/components/docs/header";
import { fileTreeProps, fileNodeProps, treeNodeProps } from "./props";
import FileTreeCodeExample from "../examples";

export default function FileTreeDocs() {
  return (
    <div className="container max-w-6xl py-10 space-y-10">
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
