"use client";
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
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHovered = useMotionValue(0);

  // Create smooth spring animations
  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });
  const hoverSpring = useSpring(isHovered, { stiffness: 500, damping: 50 });

  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseY, [-100, 100], [2, -2]);
  const rotateY = useTransform(mouseX, [-100, 100], [-2, 2]);

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    // Calculate distance from center
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    isHovered.set(0);
  }

  function handleMouseEnter() {
    isHovered.set(1);
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-xl p-8",
        "border border-white/10",
        "transition-colors duration-500",
        "cursor-pointer",
        className
      )}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
          boxShadow: `0 0 30px ${glowColor}`,
          opacity: useTransform(hoverSpring, [0, 1], [0.2, 0.3]),
        }}
      />

      {/* Content */}
      <div className="relative" style={{ transform: "translateZ(50px)" }}>
        <h3 className="text-xl font-bold mb-2" style={{ color }}>
          {title}
        </h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>

      {/* Hover gradient effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, ${color}20, transparent)`,
          opacity: useTransform(hoverSpring, [0, 1], [0, 0.2]),
        }}
      />
    </motion.div>
  );
};

export default HighlightedArticle;
