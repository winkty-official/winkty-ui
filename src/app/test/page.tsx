"use client";

import Directory, {
  DirectoryProps,
} from "@/components/base/directory/directory";
import { DirectoryProvider } from "@/components/base/directory/directory-context";

const sampleData: DirectoryProps = {
  name: "project",
  id: "root",
  path: "project",
  children: [
    {
      name: "src",
      id: "src",
      path: "src",
      children: [
        {
          name: "app",
          id: "app",
          path: "app",
          children: [
            { name: "layout.tsx", id: "layout", isFile: true, path: "layout" },
            { name: "page.tsx", id: "page", isFile: true, path: "page" },
            {
              name: "blog",
              id: "blog",
              path: "blog",
              children: [
                { name: "[slug].tsx", id: "slug", isFile: true, path: "slug" },
                {
                  name: "page.tsx",
                  id: "blogPage",
                  isFile: true,
                  path: "blogPage",
                },
              ],
            },
          ],
        },
        {
          name: "components",
          id: "components",
          path: "components",
          children: [
            {
              name: "ui",
              id: "ui",
              path: "ui",
              children: [
                {
                  name: "button.tsx",
                  id: "button",
                  isFile: true,
                  path: "button",
                },
                { name: "input.tsx", id: "input", isFile: true, path: "input" },
              ],
            },
            { name: "header.tsx", id: "header", isFile: true, path: "header" },
            { name: "footer.tsx", id: "footer", isFile: true, path: "footer" },
          ],
        },
      ],
    },
    {
      name: "public",
      id: "public",
      path: "public",
      children: [
        {
          name: "images",
          id: "images",
          path: "images",
          children: [
            { name: "logo.svg", id: "logo", isFile: true, path: "logo" },
            { name: "hero.png", id: "hero", isFile: true, path: "hero" },
          ],
        },
      ],
    },
    { name: "package.json", id: "package", isFile: true, path: "package" },
    { name: "tsconfig.json", id: "tsconfig", isFile: true, path: "tsconfig" },
  ],
};

export default function TestPage() {
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-6">Directory Configurations</h1>

        <div className="grid gap-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Default (Non-selectable)
            </h2>
            <DirectoryProvider>
              <Directory {...sampleData} />
            </DirectoryProvider>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Selectable (Single)</h2>
            <DirectoryProvider config={{ selectable: true }}>
              <Directory {...sampleData} />
            </DirectoryProvider>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Selectable (Multi)</h2>
            <DirectoryProvider config={{ selectable: true, multiSelect: true }}>
              <Directory {...sampleData} />
            </DirectoryProvider>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">No Icons</h2>
            <DirectoryProvider config={{ showIcons: false }}>
              <Directory {...sampleData} />
            </DirectoryProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
