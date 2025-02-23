"use client";
import React from 'react';
import { DockIcon } from './dock-icons';
import { useMotionValue , motion} from 'framer-motion';
import { cn } from '@/lib/utils';
import Telegram from '@/components/icons/app-icons/telegram';
import DockerIcon from '@/components/icons/app-icons/docker';
import SlackIcon from '@/components/icons/app-icons/slack';
import MongoDBIcon from '@/components/icons/app-icons/mongodb';
import FigmaIcon from '@/components/icons/app-icons/figma';

interface DockProps {
  openApp: (appId: string) => void;
  openApps: Set<string>;
}

export function Dock({ openApp, openApps }: DockProps) {

  const icons = [
    { id: 'settings', name: 'Settings', icon: <DockerIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { id: 'music', name: 'Music', icon: <SlackIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { id: 'photos', name: 'Photos', icon: <MongoDBIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { id: 'terminal', name: 'Figma', icon: <FigmaIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { id: 'telegram', name: 'Telegram', icon: <Telegram /> },
    { id: 'settings', name: 'Settings', icon: <DockerIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { id: 'music', name: 'Music', icon: <SlackIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { id: 'photos', name: 'Photos', icon: <MongoDBIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { id: 'terminal', name: 'Figma', icon: <FigmaIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { id: 'telegram', name: 'Telegram', icon: <Telegram /> },
  ];

  let mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
            "mx-auto hidden md:flex h-14 gap-4 items-end  rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
          )}
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {icons.map((icon, index) => (
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
  );
}