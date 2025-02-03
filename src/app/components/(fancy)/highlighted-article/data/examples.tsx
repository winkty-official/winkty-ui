import type { CodeExample } from "@/components/docs/code-examples";
import { HighlightedArticle } from "@/components/fancy/highlighted-article";

export const usageExamples: CodeExample[] = [
  {
    title: "Basic Usage",
    description: "Simple article card with hover effects",
    preview: (
      <div className="w-full p-8 bg-background/95 rounded-lg">
        <HighlightedArticle
          title="Getting Started with React"
          description="Learn the fundamentals of React and build your first application"
          image="/placeholder.jpg"
          date="2024-03-15"
          author={{ name: "John Doe", avatar: "/avatars/john.jpg" }}
        />
      </div>
    ),
    code: `import { HighlightedArticle } from "@/components/ui/highlighted-article";

export function BasicExample() {
  return (
    <HighlightedArticle
      title="Getting Started with React"
      description="Learn the fundamentals of React and build your first application"
      image="/placeholder.jpg"
      date="2024-03-15"
      author={{ name: "John Doe", avatar: "/avatars/john.jpg" }}
    />
  );
}`,
  },
  {
    title: "Custom Styling",
    description: "Article card with custom styling and animations",
    preview: (
      <div className="w-full p-8 bg-background/95 rounded-lg">
        <HighlightedArticle
          title="Advanced TypeScript Patterns"
          description="Explore advanced TypeScript patterns and best practices"
          image="/typescript.jpg"
          date="2024-03-10"
          author={{ name: "Jane Smith" }}
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
      image="/typescript.jpg"
      date="2024-03-10"
      author={{ name: "Jane Smith" }}
      className="custom-theme"
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
