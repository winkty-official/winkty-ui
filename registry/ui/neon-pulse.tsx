"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NeonPulseProps {
  text: string;
  className?: string;
  color?: string;
  glowColor?: string;
  fontSize?: string;
  pulseDuration?: number;
}

const useNeonPulse = (duration: number) => {
  const [intensity, setIntensity] = useState(1);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIntensity((prev) => (prev === 1 ? 0.5 : 1));
    }, duration);

    return () => clearInterval(pulseInterval);
  }, [duration]);

  return intensity;
};

export const NeonPulse: React.FC<NeonPulseProps> = ({
  text,
  className = "",
  color = "#ff00ff",
  glowColor = "#ff00ff",
  fontSize = "4rem",
  pulseDuration = 1500,
}) => {
  const intensity = useNeonPulse(pulseDuration);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 blur-xl"
        style={{
          backgroundColor: glowColor,
          opacity: 0.7,
        }}
        animate={{ opacity: [0.5, 0.7, 0.6] }}
        transition={{
          duration: pulseDuration / 1000,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.h1
        className="relative z-10"
        style={{
          fontSize,
          fontWeight: "bold",
          color: color,
          textShadow: `0 0 5px ${glowColor}, 0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
        }}
        animate={{
          textShadow: `0 0 5px ${glowColor}, 0 0 ${
            10 * intensity
          }px ${glowColor}, 0 0 ${20 * intensity}px ${glowColor}`,
        }}
        transition={{
          duration: pulseDuration / 1000,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};
