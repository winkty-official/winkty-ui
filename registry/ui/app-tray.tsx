"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useRef,
  useState,
  RefObject,
} from "react";
import { create } from "zustand";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";

// Type Definitions
interface APPTRAYState {
  openApps: Set<string>;
  minimizeApps: Set<string>;
  openApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  minimizeApp: (appId: string) => void;
  restoreApp: (appId: string) => void;
}

// Store Creation
const useAppTrayStore = create<APPTRAYState>((set) => ({
  openApps: new Set<string>(),
  minimizeApps: new Set<string>(),
  openApp: (appId: string) =>
    set((state) => {
      const newOpenApps = new Set(state.openApps);
      newOpenApps.add(appId);
      return { openApps: newOpenApps };
    }),
  closeApp: (appId: string) =>
    set((state) => {
      const newOpenApps = new Set(state.openApps);
      newOpenApps.delete(appId);
      return { openApps: newOpenApps };
    }),
  minimizeApp: (appId: string) =>
    set((state) => {
      const newMinimizeApps = new Set(state.minimizeApps);
      newMinimizeApps.add(appId);
      const newOpenApps = new Set(state.openApps);
      newOpenApps.delete(appId);
      return { minimizeApps: newMinimizeApps, openApps: newOpenApps };
    }),
  restoreApp: (appId: string) =>
    set((state) => {
      const newMinimizeApps = new Set(state.minimizeApps);
      newMinimizeApps.delete(appId);
      const newOpenApps = new Set(state.openApps);
      newOpenApps.add(appId);
      return { minimizeApps: newMinimizeApps, openApps: newOpenApps };
    }),
}));

// Context Definition
const APPTRAYContext = createContext<MotionValue<number> | null>(null);

// Animation Configuration
const APPTRAY_ANIMATION_CONFIG = {
  distanceInput: [-200, -100, 0, 100, 200],
  sizeOutput: [35, 50, 70, 50, 35],
  iconSizeOutput: [20, 30, 40, 30, 20],
  spring: {
    mass: 0.5,
    stiffness: 100,
    damping: 5,
  },
  bounces: [
    { scale: 1.2, y: -10 },
    { scale: 1, y: 0 },
    { scale: 1.1, y: -5 },
    { scale: 1, y: 0 },
    { scale: 1.05, y: -2 },
    { scale: 1, y: 0 },
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

// AppTray Component Props
interface APPTRAYProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A appTray component that provides a container for appTray icons with mouse tracking capabilities.
 * @param {APPTRAYProps} props - The component props
 * @param {React.ReactNode} props.children - The appTray icons to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {ForwardedRef<HTMLDivElement>} ref - Forwarded ref to the appTray container
 * @returns {JSX.Element} The appTray component
 */
const AppTray = forwardRef<HTMLDivElement, APPTRAYProps>(
  ({ children, className }, ref) => {
    const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
    const appTrayRef = useRef<HTMLDivElement>(null);
    const resolvedRef = (ref as RefObject<HTMLDivElement>) || appTrayRef;

    return (
      <APPTRAYContext.Provider value={mouseX}>
        <div
          ref={resolvedRef}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <motion.div
            id="appTray-main"
            layoutId="window-appTray"
            onMouseMove={(e) => {
              if ((e.target as HTMLElement).id === "appTray-main") {
                mouseX.set(e.clientX);
              }
            }}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
              "mx-auto hidden h-14 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900",
              className,
            )}
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {children}
          </motion.div>
        </div>
      </APPTRAYContext.Provider>
    );
  },
);
AppTray.displayName = "AppTray";

// AppTrayIcon Component Props
interface APPTRAYIconProps {
  id: string;
  name: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * A appTray icon component with hover animations and click handling.
 * @param {APPTRAYIconProps} props - The component props
 * @param {string} props.id - Unique identifier for the app
 * @param {string} props.name - Name of the app (displayed in tooltip)
 * @param {React.ReactNode} [props.icon] - Icon to display
 * @param {string} [props.className] - Additional CSS classes
 * @param {ForwardedRef<HTMLDivElement>} ref - Forwarded ref to the appTray icon
 * @returns {JSX.Element} The appTray icon component
 */
const AppTrayIcon = forwardRef<HTMLDivElement, APPTRAYIconProps>(
  ({ id, name, icon, className }, ref) => {
    const { openApp, openApps } = useAppTrayStore();
    const isOpen = openApps.has(id);
    const iconRef = useRef<HTMLDivElement>(null);
    const resolvedRef = (ref as RefObject<HTMLDivElement>) || iconRef;
    const { isLoading, handleClick } = useAPPTRAYAnimation(() => openApp(id));
    const mouseX = useContext(APPTRAYContext);
    const { width, height, widthIcon, heightIcon } = mouseX
      ? useAPPTRAYHover(mouseX, resolvedRef)
      : { width: 0, height: 0, widthIcon: 0, heightIcon: 0 };
    const [hovered, setHovered] = useState(false);

    return (
      <motion.div
        ref={resolvedRef}
        style={{ width, height }}
        animate={isLoading ? APPTRAY_ANIMATION_CONFIG.loading : undefined}
        transition={APPTRAY_ANIMATION_CONFIG.transition}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        className={cn(
          "relative flex aspect-square cursor-pointer items-center justify-center rounded-sm bg-gray-200 dark:bg-neutral-800",
          className,
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              {...APPTRAY_ANIMATION_CONFIG.tooltip}
              className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
              aria-label="tooltip"
              aria-hidden={!hovered}
            >
              {name}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex select-none items-center justify-center"
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
  },
);
AppTrayIcon.displayName = "AppTrayIcon";

/**
 * Hook to handle appTray hover animations based on mouse position.
 * @param {MotionValue<number>} mouseX - The mouse X position motion value
 * @param {RefObject<HTMLElement>} ref - Reference to the appTray icon element
 * @returns {Object} Width and height transformations for the appTray icon and its inner icon
 */
function useAPPTRAYHover(
  mouseX: MotionValue<number>,
  ref: RefObject<HTMLElement>,
) {
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(
    distance,
    [...APPTRAY_ANIMATION_CONFIG.distanceInput],
    [...APPTRAY_ANIMATION_CONFIG.sizeOutput],
  ) as MotionValue<number>;
  const heightTransform = useTransform(
    distance,
    [...APPTRAY_ANIMATION_CONFIG.distanceInput],
    [...APPTRAY_ANIMATION_CONFIG.sizeOutput],
  ) as MotionValue<number>;
  const widthTransformIcon = useTransform(
    distance,
    [...APPTRAY_ANIMATION_CONFIG.distanceInput],
    [...APPTRAY_ANIMATION_CONFIG.iconSizeOutput],
  ) as MotionValue<number>;
  const heightTransformIcon = useTransform(
    distance,
    [...APPTRAY_ANIMATION_CONFIG.distanceInput],
    [...APPTRAY_ANIMATION_CONFIG.iconSizeOutput],
  ) as MotionValue<number>;

  const width = useSpring(widthTransform as unknown as number, {
    ...APPTRAY_ANIMATION_CONFIG.spring,
  });
  const height = useSpring(heightTransform, {
    ...APPTRAY_ANIMATION_CONFIG.spring,
  });
  const widthIcon = useSpring(widthTransformIcon, {
    ...APPTRAY_ANIMATION_CONFIG.spring,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    ...APPTRAY_ANIMATION_CONFIG.spring,
  });

  return { width, height, widthIcon, heightIcon };
}

/**
 * Hook to manage appTray icon click animation and callback.
 * @param {() => void} onOpen - Callback to execute when animation completes
 * @returns {Object} Loading state and click handler
 */
function useAPPTRAYAnimation(onOpen: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const bounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    if (bounceTimer.current) {
      clearTimeout(bounceTimer.current);
    }

    let delay = 0;
    APPTRAY_ANIMATION_CONFIG.bounces.forEach((_, index) => {
      bounceTimer.current = setTimeout(() => {
        if (index === APPTRAY_ANIMATION_CONFIG.bounces.length - 1) {
          setIsLoading(false);
          onOpen();
        }
      }, delay);
      delay += APPTRAY_ANIMATION_CONFIG.bounceDelay;
    });
  }, [onOpen]);

  return { isLoading, handleClick };
}

export { AppTray, AppTrayIcon, useAppTrayStore };
