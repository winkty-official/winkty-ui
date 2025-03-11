"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

// Define prop types
interface TiltCardProps {
  /** Additional classes to apply to the outer container */
  className?: string;
  /** Gradient background class (Tailwind format) */
  gradient?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Disables interactions and animations */
  disabled?: boolean;
  /** Custom ARIA label for accessibility */
  ariaLabel?: string;
  /** Custom content to render inside the card */
  children: React.ReactNode;
}

/**
 * A floating  card component with 3D hover effects and smooth animations.
 * This component provides a flexible container for custom content while maintaining
 * an engaging floating effect and accessibility features.
 *
 * @component
 * @example
 * Basic usage with custom content:
 * ```tsx
 * import { TiltCard } from "@/components/ui/floating-feature";
 * import { Zap } from "lucide-react";
 *
 * <TiltCard
 *   title="Fast Performance"
 *   gradient="from-blue-500/20 to-transparent"
 * >
 *   <div className="flex items-center gap-2">
 *     <Zap className="h-6 w-6 text-blue-500" />
 *     <div>
 *       <h3 className="text-lg font-semibold">Fast Performance</h3>
 *       <p className="text-sm text-muted-foreground">
 *         Lightning fast load times
 *       </p>
 *     </div>
 *   </div>
 * </TiltCard>
 * ```
 *
 * @example
 * Usage with multiple elements:
 * ```tsx
 * <TiltCard delay={0.2}>
 *   <div className="space-y-4">
 *     <img src="/feature-icon.png" alt="Feature" className="h-8 w-8" />
 *     <h3 className="text-xl font-bold">Custom Feature</h3>
 *     <p>Some description here</p>
 *     <button className="btn">Learn More</button>
 *   </div>
 * </TiltCard>
 * ```
 */
const TiltCard = React.forwardRef<
  HTMLDivElement,
  TiltCardProps
>(
  (
    {
      className,
      gradient = "from-primary/20 via-primary/10 to-transparent",
      delay = 0,
      disabled = false,
      ariaLabel,
      children,
      ...props
    },
    ref
  ) => {
    const [viewRef, inView] = useInView({
      threshold: 0.2,
      triggerOnce: true,
    });

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth rotation animations
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
      stiffness: 150,
      damping: 20,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
      stiffness: 150,
      damping: 20,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseXFromCenter = e.clientX - rect.left - width / 2;
      const mouseYFromCenter = e.clientY - rect.top - height / 2;
      mouseX.set(mouseXFromCenter / width);
      mouseY.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
      if (disabled) return;
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={(node) => {
          viewRef(node);
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        style={{ perspective: 1000 }}
        className={cn("w-full max-w-sm", className)}
        aria-label={ariaLabel ?? `${Date.now()} feature card`}
        {...props}
      >
        <motion.div
          className={cn(
            "relative overflow-hidden rounded-xl border bg-card p-8",
            "transition-colors hover:border-primary/50",
            "before:absolute before:inset-0",
            `before:bg-gradient-to-b before:${gradient}`,
            disabled && "opacity-50 pointer-events-none"
          )}
          style={{
            rotateX: disabled ? 0 : rotateX,
            rotateY: disabled ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={
            !disabled && {
              // y: [0, -12, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }
          }
          aria-disabled={disabled}
        >
          <motion.div
            className="relative z-10 flex flex-col items-start gap-4 "
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
);

TiltCard.displayName = "TiltCard";

export default TiltCard;