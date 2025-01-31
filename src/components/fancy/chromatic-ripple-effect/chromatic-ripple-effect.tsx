"use client";

import type React from "react";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface TextRippleEffectProps {
  children?: React.ReactNode | string;
  className?: string;
  rippleColor?: string;
  rippleSize?: number;
  rippleDuration?: number;
}

export const TextRippleEffect: React.FC<TextRippleEffectProps> = ({
  children,
  className = "",
  rippleColor = "#3b82f6",
  rippleSize = 100,
  rippleDuration = 0.5,
}) => {
  const [ripples, setRipples] = useState<
    { x: number; y: number; key: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleCount = useRef(0);

  const addRipple = useCallback(
    (x: number, y: number) => {
      const newRipple = { x, y, key: rippleCount.current };
      setRipples((prevRipples) => [...prevRipples, newRipple]);
      rippleCount.current += 1;

      setTimeout(() => {
        setRipples((prevRipples) =>
          prevRipples.filter((r) => r.key !== newRipple.key)
        );
      }, rippleDuration * 1000);
    },
    [rippleDuration]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        addRipple(x, y);
      }
    },
    [addRipple]
  );

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - rippleSize / 2,
            top: ripple.y - rippleSize / 2,
            width: rippleSize,
            height: rippleSize,
            background: rippleColor,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: rippleDuration, ease: "easeOut" }}
        />
      ))}
      <div className="relative z-10">
        {typeof children === "string"
          ? children?.split("").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block text-primary"
                initial={{ y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
              >
                {char}
              </motion.span>
            ))
          : children}
      </div>
    </div>
  );
};
