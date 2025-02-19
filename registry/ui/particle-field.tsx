"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  glowIntensity?: number;
  expandScale?: number;
}

export const ParticleField = ({
  className,
  particleCount = 50,
  colors = ["#4f46e5", "#0ea5e9", "#8b5cf6", "#ec4899"],
  minSize = 3,
  maxSize = 6,
  glowIntensity = 15,
  expandScale = 1.5,
}: ParticleFieldProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const controls = useAnimation();
  const [, setContainerSize] = useState({ width: 0, height: 0 });

  // Update particles and container size dynamically
  useEffect(() => {
    const updateParticles = () => {
      const container = document.querySelector(
        ".particle-field-container"
      ) as HTMLElement;
      if (!container) return;

      const { offsetWidth: width, offsetHeight: height } = container;
      setContainerSize({ width, height });

      setParticles(
        Array.from({ length: particleCount }, (_, i) => ({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (maxSize - minSize) + minSize,
          color: colors[Math.floor(Math.random() * colors.length)],
        }))
      );
    };

    updateParticles();
    window.addEventListener("resize", updateParticles);
    return () => window.removeEventListener("resize", updateParticles);
  }, [particleCount, colors, minSize, maxSize]);

  // Animate particle movement
  useEffect(() => {
    const interval = setInterval(() => {
      controls.start((particle: Particle) => ({
        x: particle.x + (Math.random() - 0.5) * 10,
        y: particle.y + (Math.random() - 0.5) * 10,
        transition: {
          duration: 2,
          ease: "easeInOut",
        },
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [controls]);

  // Handle hover effects
  const handleHover = (id: number) => {
    controls.start((particle: Particle) =>
      particle.id === id
        ? { scale: expandScale, filter: `blur(${glowIntensity}px)` }
        : {}
    );
  };

  return (
    <div
      className={`relative w-full h-full particle-field-container ${className}`}
      style={{ overflow: "hidden" }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${glowIntensity}px ${particle.color}`,
          }}
          initial={{ x: particle.x, y: particle.y, scale: 1 }}
          animate={controls}
          custom={particle}
          whileHover={{ scale: expandScale }}
          onMouseEnter={() => handleHover(particle.id)}
        />
      ))}
    </div>
  );
};
