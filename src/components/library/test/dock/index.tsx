"use client";
import React, { createContext } from "react";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, MotionValue } from "framer-motion";
import { create } from "zustand";
import { AppWindow } from "./app-window";
import { DockIcon } from "./dock-icons";

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
  iconProperties: {
    id: string;
    name: string;
    icon: React.ReactNode;
  }[];
}

export function Dock({ children, iconProperties }: DockProps) {
  let mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  const { openApp, openApps } = useDockStore();

  return (
    <DockContext.Provider value={mouseX}>
      <div className="fixed bottom-4 left-1/2  -translate-x-1/2">
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(
            "mx-auto hidden md:flex h-14 gap-4 items-end  rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
          )}
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {iconProperties?.map((icon) => (
            <DockIcon
              key={icon.id}
              name={icon.name}
              icon={icon.icon}
              onOpen={() => openApp(icon.id)}
              isOpen={openApps.has(icon.id)}
              mouseX={mouseX}
            />
          ))}
        </motion.div>
      </div>
      {iconProperties?.map((icon) => (
        <AppWindow key={icon.id} title={icon.name} appId={icon.id} className="max-h-96 overflow-auto">
          {children}
        </AppWindow>
      ))}
    </DockContext.Provider>
  );
}
