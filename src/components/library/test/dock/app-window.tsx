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
}

export function AppWindow({
  title,
  children,
  appId,
  iconProperties,
  className,
}: AppWindowProps) {
  const mouseX = useContext(DockContext);
  console.log("🚀 ~ AppWindow ~ mouseX:", mouseX);

  const { openApps, minimizeApp, closeApp, openApp } = useDockStore();
  const isOpen = openApps.has(appId);

  const windowRef = useRef<HTMLDivElement>(null);
  const [minimizeTarget, setMinimizeTarget] = useState({ x: 0, y: 0 });
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
  });

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
            }}
            layoutId={`window-${title.toLowerCase()}`}
          >
            <motion.div
              className="flex items-center justify-between bg-gray-900 px-4 py-2 top-0 w-full z-10"
              layout
            >
              <div className="group flex gap-2 ">
                <button
                  onClick={() => handleClose(appId)}
                  className="p-[.5] rounded-full bg-red-500 transition-colors hover:bg-red-600"
                >
                  <X className="size-[0.625rem] opacity-0 transition-opacity group-hover:opacity-100 text-black" />
                </button>
                <button
                  onClick={() => handleMinimize(appId)}
                  className="p-[.5] rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
                >
                  <Minus className="size-[0.625rem] opacity-0 transition-opacity group-hover:opacity-100 text-black" />
                </button>
              </div>
              <span className="text-sm text-gray-400">{title}</span>
              <div className="w-16" />
            </motion.div>
            <motion.div className="p-4 h-[calc(var(--window-height)-36px)] overflow-auto" layout>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
