export const packageInfo = {
  pkg: {
    name: "@yourlibrary/highlighted-article",
    dependencies: ["framer-motion"],
  },
  cli: {
    command:
      "npx shadcn-ui@latest add https://your-domain.com/registry/highlighted-article.json",
  },
  manual: {
    files: [
      {
        name: "highlighted-article.tsx",
        code: `"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";

interface HighlightedArticleProps {
  title: string;
  description: string;
  color?: string;
  glowColor?: string;
  className?: string;
}

export const HighlightedArticle = ({
  title,
  description,
  color = "#4f46e5",
  glowColor = "#818cf8",
  className,
}: HighlightedArticleProps) => {
  // ... rest of the component code
}`,
      },
    ],
  },
};
