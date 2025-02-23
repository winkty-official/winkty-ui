"use client";
import { cn } from "@/lib/utils";
import { motion, MotionValue, useMotionValue } from "framer-motion";
import React, { createContext, useLayoutEffect, useState } from "react";
import { create } from "zustand";

interface DockState {
  openApps: Set<string>;
  minimizeApps: Set<string>;
  openApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  minimizeApp: (appId: string) => void;
  restoreApp: (appId: string) => void;
}

export const useDockStore = create<DockState>((set) => ({
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
      return { minimizeApps: newMinimizeApps };
    }),
  restoreApp: (appId: string) =>
    set((state) => {
      const newMinimizeApps = new Set(state.minimizeApps);
      newMinimizeApps.delete(appId);
      return { minimizeApps: newMinimizeApps };
    }),
}));

export const DockContext = createContext<MotionValue<number> | null>(null);

interface DockProps {
  children: React.ReactNode;
}

export function Dock({ children }: DockProps) {
  let mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  const docRef = React.useRef<HTMLDivElement>(null);
  const [dockWidth, setDockWidth] = useState(0);

  useLayoutEffect(() => {
    if (docRef.current) {
      const width = docRef.current.offsetWidth;
      setDockWidth(width);
      docRef.current.style.setProperty("--dock-width", `${width}px`);
    }
  }, []);

  return (
    <DockContext.Provider value={mouseX}>
      <div
        ref={docRef}
        className="fixed bottom-4"
        style={{
          left: `calc(50% - ${dockWidth / 2}px)`,
          opacity: !!dockWidth ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        <motion.div
          id="dock-main"
          layoutId={`window-dock`}
          onMouseMove={(e) => {
            (e.target as HTMLElement).id === "dock-main" && mouseX.set(e.clientX);
          }}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(
            "mx-auto hidden md:flex h-14 gap-4 items-end  rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
          )}
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {children}
        </motion.div>
      </div>
    </DockContext.Provider>
  );
}
