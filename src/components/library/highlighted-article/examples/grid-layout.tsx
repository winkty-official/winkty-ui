import { HighlightedArticle } from "@/components/ui/highlighted-article";
import React from "react";

function GridLayoutExample() {
  return (
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
  );
}

export default GridLayoutExample;
