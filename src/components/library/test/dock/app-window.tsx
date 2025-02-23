import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useLayoutEffect,
} from "react";
import { X, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DockContext, useDockStore } from ".";
import { cn } from "@/lib/utils";
import { DockIcon } from "./dock-icons";
import { create } from "zustand";

// Store to manage z-index of windows
interface ZIndexState {
  highestZIndex: number;
  bringToFront: () => number;
}

export const useZIndexStore = create<ZIndexState>((set, get) => ({
  highestZIndex: 100, // Starting z-index (must be below dock)
  bringToFront: () => {
    set((state) => {
      const newZIndex = state.highestZIndex + 1;
      return { highestZIndex: newZIndex };
    });
    return get().highestZIndex;
  },
}));

interface AppWindowProps {
  title: string;
  children: React.ReactNode;
  appId: string;
  className?: string;
  iconProperties: {
    id: string;
    name: string;
    icon: React.ReactNode;
  };
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function AppWindow({
  title,
  children,
  appId,
  iconProperties,
  className,
  containerRef,
}: AppWindowProps) {
  const mouseX = useContext(DockContext);
  const { openApps, minimizeApp, closeApp, openApp } = useDockStore();
  const isOpen = openApps.has(appId);

  const windowRef = useRef<HTMLDivElement>(null);
  const [minimizeTarget, setMinimizeTarget] = useState({ x: 0, y: 0 });
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Track zIndex of this window
  const { highestZIndex, bringToFront } = useZIndexStore();
  const [zIndex, setZIndex] = useState(highestZIndex);

  useEffect(() => {
    if (!isOpen) {
      setIsMinimizing(false);
      setIsClosing(false);
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    if (isOpen) {
      const height = windowRef.current?.offsetHeight;
      const width = windowRef.current?.offsetWidth;
      windowRef.current?.style.setProperty("--window-height", `${height}px`);
      windowRef.current?.style.setProperty("--window-width", `${width}px`);
    }
  }, [isOpen]);

  useEffect(() => {
    const updateMinimizeTarget = () => {
      const dockIcon = document.querySelector(
        `[data-app="${title.toLowerCase()}"]`,
      );
      if (dockIcon && windowRef.current) {
        const iconRect = dockIcon.getBoundingClientRect();
        const windowRect = windowRef.current.getBoundingClientRect();

        setMinimizeTarget({
          x:
            iconRect.left -
            windowRect.left +
            (iconRect.width - windowRect.width) / 2,
          y:
            iconRect.top -
            windowRect.top +
            (iconRect.height - windowRect.height) / 2,
        });
      }
    };

    if (isOpen && !isMinimizing && !isClosing) {
      updateMinimizeTarget();
      window.addEventListener("resize", updateMinimizeTarget);
      return () => window.removeEventListener("resize", updateMinimizeTarget);
    }
  }, [isOpen, isMinimizing, isClosing, title]);

  const handleClose = (appId: string) => {
    setIsClosing(true);
    setTimeout(() => {
      closeApp(appId);
      setIsClosing(false);
    }, 300);
  };

  const handleMinimize = (appId: string) => {
    setIsMinimizing(true);
    setTimeout(() => {
      minimizeApp(appId);
      setIsMinimizing(false);
    }, 300);
  };

  const handleClick = () => {
    setZIndex(bringToFront());
  };

  return (
    <>
      <DockIcon
        key={iconProperties.id}
        name={iconProperties.name}
        icon={iconProperties.icon}
        onOpen={() => openApp(iconProperties.id)}
        isOpen={openApps.has(iconProperties.id)}
        mouseX={mouseX}
      />
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={windowRef}
            onMouseDown={handleClick} // Bring window to front when clicked
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            animate={
              isMinimizing || isClosing
                ? {
                    scale: 0.5,
                    opacity: 0,
                    x: minimizeTarget.x,
                    y: minimizeTarget.y,
                    transition: {
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }
                : {
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    },
                  }
            }
            exit={{
              scale: 0.8,
              opacity: 0,
              y: 20,
              transition: {
                duration: 0.2,
              },
            }}
            className={cn(
              "fixed inset-0 left-[30%] top-[30%] w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-gray-800 shadow-2xl",
              className,
            )}
            style={{
              transformOrigin: "center center",
              pointerEvents: isMinimizing || isClosing ? "none" : "auto",
              zIndex, // Apply dynamically updated z-index
            }}
            layoutId={`window-${title.toLowerCase()}`}
            drag
            whileDrag={{ scale: 0.95 }}
            dragConstraints={containerRef || false}
            dragMomentum={false}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              windowRef.current?.style.setProperty(
                "--window-x",
                `${info.point.x}px`,
              );
              windowRef.current?.style.setProperty(
                "--window-y",
                `${info.point.y}px`,
              );
            }}
          >
            <motion.div
              className="flex items-center justify-between bg-gray-900 px-4 py-2 top-0 w-full z-10"
              layout
              dragListener={true}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            >
              <div className="group flex gap-2">
                <button
                  onClick={() => handleClose(appId)}
                  className="p-[.5] rounded-full bg-red-500 transition-colors hover:bg-red-600"
                >
                  <X className="size-[0.625rem] text-black" />
                </button>
                <button
                  onClick={() => handleMinimize(appId)}
                  className="p-[.5] rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
                >
                  <Minus className="size-[0.625rem] text-black" />
                </button>
              </div>
              <span className="text-sm text-gray-400">{title}</span>
              <div className="w-16" />
            </motion.div>
            <motion.div className="p-4">{children}</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
