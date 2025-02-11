import { HighlightedArticle } from "@/components/fancy/highlighted-article";
import type { CodeExample } from "@/components/docs/code-examples";

export const usageExamples: CodeExample[] = [
  {
    title: "Basic Usage",
    description: "Simple highlighted article with default styling",
    preview: (
      <div className="w-full p-8 bg-background/95 rounded-lg">
        <HighlightedArticle
          title="Getting Started with React"
          description="Learn the fundamentals of React and build your first application"
        />
      </div>
    ),
    code: `import { HighlightedArticle } from "@/components/ui/highlighted-article";

export function BasicExample() {
  return (
    <HighlightedArticle
      title="Getting Started with React"
      description="Learn the fundamentals of React and build your first application"
    />
  );
}`,
  },
  {
    title: "Custom Colors",
    description: "Article with custom highlight and glow colors",
    preview: (
      <div className="w-full p-8 bg-background/95 rounded-lg">
        <HighlightedArticle
          title="Advanced TypeScript Patterns"
          description="Explore advanced TypeScript patterns and best practices"
          color="#22c55e"
          glowColor="#4ade80"
          className="custom-theme"
        />
      </div>
    ),
    code: `import { HighlightedArticle } from "@/components/ui/highlighted-article";

export function CustomExample() {
  return (
    <HighlightedArticle
      title="Advanced TypeScript Patterns"
      description="Explore advanced TypeScript patterns and best practices"
      color="#22c55e"
      glowColor="#4ade80"
      className="custom-theme"
    />
  );
}`,
  },
];
