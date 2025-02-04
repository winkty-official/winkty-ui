import { HighlightedArticle } from "@/components/fancy/highlighted-article";
import type { CodeExample } from "@/components/docs/code-examples";

export const usageExamples: CodeExample[] = [
  {
    title: "Basic Usage",
    description: "A simple highlighted article with default styling",
    preview: (
      <div className="w-full max-w-md mx-auto">
        <HighlightedArticle>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#4f46e5]">
              Getting Started with React
            </h3>
            <p className="text-white/70">
              Learn the fundamentals of React and start building modern web
              applications.
            </p>
          </div>
        </HighlightedArticle>
      </div>
    ),
    code: `import { HighlightedArticle } from "@/components/ui/highlighted-article";

export function BasicExample() {
  return (
    <HighlightedArticle>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Getting Started with React</h3>
        <p className="text-white/70">
          Learn the fundamentals of React and start building modern web applications.
        </p>
      </div>
    </HighlightedArticle>
  );
}`,
  },
  {
    title: "Custom Colors",
    description: "Customizing the colors of the highlighted article",
    preview: (
      <div className="w-full max-w-md mx-auto">
        <HighlightedArticle color="#22c55e" glowColor="#4ade80">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#22c55e]">
              Advanced TypeScript
            </h3>
            <p className="text-white/70">
              Master TypeScript's advanced features and type system.
            </p>
          </div>
        </HighlightedArticle>
      </div>
    ),
    code: `import { HighlightedArticle } from "@/components/ui/highlighted-article";

export function CustomColorExample() {
  return (
    <HighlightedArticle color="#22c55e" glowColor="#4ade80">
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Advanced TypeScript</h3>
        <p className="text-white/70">
          Master TypeScript's advanced features and type system.
        </p>
      </div>
    </HighlightedArticle>
  );
}`,
  },
  {
    title: "Grid Layout",
    description: "Using multiple highlighted articles in a grid",
    preview: (
      <div className="grid md:grid-cols-2 gap-6">
        <HighlightedArticle color="#3b82f6" glowColor="#60a5fa">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#3b82f6]">React Hooks</h3>
            <p className="text-white/70">
              Understanding React Hooks and state management.
            </p>
          </div>
        </HighlightedArticle>
        <HighlightedArticle color="#ec4899" glowColor="#f472b6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#ec4899]">Next.js 13</h3>
            <p className="text-white/70">
              Building modern web apps with Next.js 13 features.
            </p>
          </div>
        </HighlightedArticle>
      </div>
    ),
    code: `import { HighlightedArticle } from "@/components/ui/highlighted-article";

export function GridExample() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <HighlightedArticle color="#3b82f6" glowColor="#60a5fa">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">React Hooks</h3>
          <p className="text-white/70">Understanding React Hooks and state management.</p>
        </div>
      </HighlightedArticle>
      <HighlightedArticle color="#ec4899" glowColor="#f472b6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Next.js 13</h3>
          <p className="text-white/70">Building modern web apps with Next.js 13 features.</p>
        </div>
      </HighlightedArticle>
    </div>
  );
}`,
  },
];
