import { HighlightedArticle } from "@/components/fancy/highlighted-article";
import { Metadata } from "next";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { CodeExamples } from "@/components/docs/code-examples";
import { Accessibility } from "@/components/docs/accessibility";
import { DynamicBreadcrumb } from "@/components/base/breadcrumb";
import { propDefinitions } from "./data/props";
import { accessibilityFeatures } from "./data/accessibility";
import { usageExamples } from "./data/examples";
import Header from "@/components/docs/header";
import { packageInfo } from "./data/package";

const articles = [
  {
    title: "Getting Started with React",
    description:
      "Learn the fundamentals of React and build your first application with step-by-step guidance.",
    color: "#4f46e5",
    glowColor: "#818cf8",
  },
  {
    title: "Advanced TypeScript Patterns",
    description:
      "Explore advanced TypeScript features and design patterns for building scalable applications.",
    color: "#0ea5e9",
    glowColor: "#38bdf8",
  },
  {
    title: "Modern CSS Techniques",
    description:
      "Discover modern CSS features and techniques for creating beautiful, responsive layouts.",
    color: "#8b5cf6",
    glowColor: "#a78bfa",
  },
  {
    title: "Next.js 14 Features",
    description:
      "Explore the latest features in Next.js 14 and learn how to leverage them in your projects.",
    color: "#ec4899",
    glowColor: "#f472b6",
  },
];

export const metadata: Metadata = {
  title: "Highlighted Article - UI Components",
  description:
    "An interactive article card component with 3D hover effects and dynamic lighting.",
};

export default function HighlightedArticlePage() {
  return (
    <div className="container max-w-4xl py-10 space-y-10">
      <DynamicBreadcrumb />

      <Header
        title="Highlighted Article"
        description="A beautiful article card component with 3D hover effects, dynamic lighting, and smooth animations."
      />

      {/* Installation */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Installation {...packageInfo} />
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Usage</h2>
        <CodeExamples examples={usageExamples} />
      </section>

      {/* Props */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <PropsTable definitions={propDefinitions} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <Accessibility features={accessibilityFeatures} />
      </section>

      <div className="min-h-screen bg-black p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">
            Featured Articles
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <HighlightedArticle
                key={index}
                title={article.title}
                description={article.description}
                color={article.color}
                glowColor={article.glowColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
