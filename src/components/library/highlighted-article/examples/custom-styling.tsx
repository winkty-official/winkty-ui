import { HighlightedArticle } from "@/components/ui/highlighted-article";
import React from "react";

function CustomStyling() {
  return (
    <div className="w-full max-w-md mx-auto">
      <HighlightedArticle color="#22c55e" glowColor="#4ade80">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#22c55e]">
            Advanced TypeScript
          </h3>
          <p className="text-white/70">
            Master TypeScript&apos;s advanced features and type system.
          </p>
        </div>
      </HighlightedArticle>
    </div>
  );
}

export default CustomStyling;
