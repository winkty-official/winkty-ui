"use client";
import { cn } from "@/lib/utils";
import {
  HTMLMotionProps,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import React, { MouseEvent } from "react";

interface HighlightedArticleProps extends HTMLMotionProps<"div"> {
  color?: string;
  glowColor?: string;
  children: React.ReactNode;
}

export const HighlightedArticle = React.forwardRef<
  HTMLDivElement,
  HighlightedArticleProps
>(
  (
    { children, color = "#4f46e5", glowColor = "#818cf8", className, ...props },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn(
          "relative overflow-hidden rounded-xl p-8",
          "border border-white/10",
          "transition-colors duration-500",
          "cursor-pointer",
          className
        )}
        style={{
          color: "white",
          ...props.style,
        }}
        {...props}
      >
        {/* Hover gradient effect */}
        <motion.div
          className="pointer-events-none absolute -z-10 -inset-px rounded-md transition duration-300"
          style={{
            background: useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, ${glowColor}40 0%, transparent 80%)`,
          }}
        />

        {/* Apply bold color to h3 elements within children */}
        <div
          className="relative [&>*>h3]:font-extrabold [&>*>h3]:text-xl [&>*>h3]:mb-2 [&>*>h3]:[text-shadow:0_0_10px_var(--glow-color)]"
          style={{ "--glow-color": `${color}40` } as React.CSSProperties}
        >
          {children}
        </div>
      </motion.div>
    );
  }
);

HighlightedArticle.displayName = "HighlightedArticle";
