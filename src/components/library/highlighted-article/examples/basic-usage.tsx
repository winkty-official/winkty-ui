import { HighlightedArticle } from "@/components/ui/highlighted-article";
import React from "react";

function BasicUsageExample() {
  return (
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
  );
}

export default BasicUsageExample;
