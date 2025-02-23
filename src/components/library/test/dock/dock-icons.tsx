"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useSpring,
  useTransform,
} from "framer-motion";


export const DOCK_ANIMATION_CONFIG = {
  distanceInput: [-150, 0, 150],
  sizeOutput: [35, 70, 35],
  iconSizeOutput: [20, 40, 20],
  spring: {
    mass: 0.1,
    stiffness: 150,
    damping: 5,
  },
  bounces: [
    { scale: 1.2, y: -10 },
    { scale: 1, y: 0 },
    { scale: 1.1, y: -5 },
    { scale: 1, y: 0 },
    { scale: 1.05, y: -2 },
    { scale: 1, y: 0 }
  ],
  bounceDelay: 200,
  loading: {
    y: [0, -10, 0, -5, 0, -2, 0] as number[],
    scale: [1, 1.2, 1, 1.1, 1, 1.05, 1] as number[],
  },
  transition: {
    duration: 1.2,
    times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
    ease: "easeInOut",
  },
  tooltip: {
    initial: { opacity: 0, y: 10, x: "-50%" },
    animate: { opacity: 1, y: 0, x: "-50%" },
    exit: { opacity: 0, y: 2, x: "-50%" },
  },
} as const;

export interface DockIconProps {
  name: string;
  icon?: React.ReactNode;
  onOpen: () => void;
  isOpen: boolean;
  mouseX: MotionValue<number> | null;
}
export function DockIcon({
  name,
  icon,
  onOpen,
  isOpen,
  mouseX,
}: DockIconProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isLoading, handleClick } = useDockAnimation(onOpen);
  const { width, height, widthIcon, heightIcon } = mouseX ? useDockHover(mouseX, ref) : { width: 0, height: 0, widthIcon: 0, heightIcon: 0 };
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      animate={isLoading ? DOCK_ANIMATION_CONFIG.loading : undefined}
      transition={DOCK_ANIMATION_CONFIG.transition}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className="aspect-square rounded-sm bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative cursor-pointer"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            {...DOCK_ANIMATION_CONFIG.tooltip}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
      {isOpen && (
        <motion.div
          className="absolute -bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/20"
          layoutId={`indicator-${name}`}
        />
      )}
    </motion.div>
  );
}




export function useDockHover(mouseX: MotionValue<number>, ref: React.RefObject<HTMLDivElement | null>) {
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(
    distance,
    [...DOCK_ANIMATION_CONFIG.distanceInput],
    [...DOCK_ANIMATION_CONFIG.sizeOutput]
  ) as MotionValue<number>;
  const heightTransform = useTransform(
    distance,
    [...DOCK_ANIMATION_CONFIG.distanceInput],
    [...DOCK_ANIMATION_CONFIG.sizeOutput]
  ) as MotionValue<number>;

  const widthTransformIcon = useTransform(
    distance,
    [...DOCK_ANIMATION_CONFIG.distanceInput],
    [...DOCK_ANIMATION_CONFIG.iconSizeOutput]
  ) as MotionValue<number>;
  
  const heightTransformIcon = useTransform(
    distance,
    [...DOCK_ANIMATION_CONFIG.distanceInput],
    [...DOCK_ANIMATION_CONFIG.iconSizeOutput]
  ) as MotionValue<number>;
 

  const width = useSpring(widthTransform as unknown as number, { ...DOCK_ANIMATION_CONFIG.spring });
  const height = useSpring(heightTransform , { ...DOCK_ANIMATION_CONFIG.spring });
  const widthIcon = useSpring(widthTransformIcon, { ...DOCK_ANIMATION_CONFIG.spring });
  const heightIcon = useSpring(heightTransformIcon, { ...DOCK_ANIMATION_CONFIG.spring });

  return { width, height, widthIcon, heightIcon };
}


export function useDockAnimation(onOpen: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const bounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    
    if (bounceTimer.current) {
      clearTimeout(bounceTimer.current);
    }

    let delay = 0;
    DOCK_ANIMATION_CONFIG.bounces.forEach((_, index) => {
      bounceTimer.current = setTimeout(() => {
        if (index === DOCK_ANIMATION_CONFIG.bounces.length - 1) {
          setIsLoading(false);
          onOpen();
        }
      }, delay);
      delay += DOCK_ANIMATION_CONFIG.bounceDelay;
    });
  }, [onOpen]);

  return { isLoading, handleClick };
}