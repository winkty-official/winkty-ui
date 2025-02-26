import { Metadata } from "next";

export const FileTreeMetaData: Metadata = {
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
    creator: "@winkty-official",
  },
};
