"use client";
import React, { useRef, useState } from "react";
import { AppWindow } from "lucide-react";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface DockIconProps {
  name: string;
  icon?: React.ReactNode;
  onOpen: () => void;
  isOpen: boolean;
  mouseX: MotionValue;
}

export function DockIcon({
  name,
  icon,
  onOpen,
  isOpen,
  mouseX,
}: DockIconProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onOpen();
    setTimeout(() => setIsAnimating(false), 1000);
  };

  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [35, 70, 35]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [35, 70, 35]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 5,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 5,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 5,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 5,
  });


  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
    ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className="aspect-square rounded-sm bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
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
