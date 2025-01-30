import { HighlightedArticle } from "@/components/fancy/highlighted-article";
import type { CodeExample } from "@/components/docs/code-examples";

export const usageExamples: CodeExample[] = [
  {
    title: "Basic Usage",
    description: "A simple highlighted article with default styling",
    preview: (
      <div className="w-full max-w-md mx-auto">
        <HighlightedArticle
          title="Getting Started with React"
          description="Learn the fundamentals of React and start building modern web applications."
        />
      </div>
    ),
    code: `import { HighlightedArticle } from "@/components/ui/highlighted-article";

export function BasicExample() {
  return (
    <HighlightedArticle
      title="Getting Started with React"
      description="Learn the fundamentals of React and start building modern web applications."
    />
  );
}`,
  },
  {
    title: "Custom Colors",
    description: "Customizing the colors of the highlighted article",
    preview: (
      <div className="w-full max-w-md mx-auto">
        <HighlightedArticle
          title="Advanced TypeScript"
          description="Master TypeScript's advanced features and type system."
          color="#22c55e"
          glowColor="#4ade80"
        />
      </div>
    ),
    code: `import { HighlightedArticle } from "@/components/ui/highlighted-article";

export function CustomColorExample() {
  return (
    <HighlightedArticle
      title="Advanced TypeScript"
      description="Master TypeScript's advanced features and type system."
      color="#22c55e"
      glowColor="#4ade80"
    />
  );
}`,
  },
  {
    title: "Grid Layout",
    description: "Using multiple highlighted articles in a grid",
    preview: (
      <div className="grid md:grid-cols-2 gap-6">
        <HighlightedArticle
          title="React Hooks"
          description="Understanding React Hooks and state management."
          color="#3b82f6"
          glowColor="#60a5fa"
        />
        <HighlightedArticle
          title="Next.js 13"
          description="Building modern web apps with Next.js 13 features."
          color="#ec4899"
          glowColor="#f472b6"
        />
      </div>
    ),
    code: `import { HighlightedArticle } from "@/components/ui/highlighted-article";

export function GridExample() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <HighlightedArticle
        title="React Hooks"
        description="Understanding React Hooks and state management."
        color="#3b82f6"
        glowColor="#60a5fa"
      />
      <HighlightedArticle
        title="Next.js 13"
        description="Building modern web apps with Next.js 13 features."
        color="#ec4899"
        glowColor="#f472b6"
      />
    </div>
  );
}`,
  },
];
