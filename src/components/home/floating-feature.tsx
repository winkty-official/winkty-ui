"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DivideIcon as LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingFeatureProps {
  title: string;
  description: string;
  icon: typeof LucideIcon;
  className?: string;
  gradient?: string;
  delay?: number;
}

export function FloatingFeature({
  title,
  description,
  icon: Icon,
  className,
  gradient = "from-primary/20 via-primary/10 to-transparent",
  delay = 0,
}: FloatingFeatureProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    mouseX.set(mouseXFromCenter / width);
    mouseY.set(mouseYFromCenter / height);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-xl border bg-card p-8",
          "transition-colors hover:border-primary/50",
          "before:absolute before:inset-0",
          `before:bg-gradient-to-b before:${gradient}`,
          className
        )}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          y: [0, -12, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut",
          },
        }}
      >
        <motion.div
          className="relative z-10 flex flex-col items-start gap-4"
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="rounded-lg border bg-background p-2 shadow-sm">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
