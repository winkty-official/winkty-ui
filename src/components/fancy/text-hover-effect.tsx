"use client";

import type React from "react";
import { motion } from "framer-motion";

interface TextHoverEffectProps {
  children: string;
  className?: string;
}

export const TextHoverEffect: React.FC<TextHoverEffectProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`inline-block ${className}`}>
      {children.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 500, damping: 10 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};
