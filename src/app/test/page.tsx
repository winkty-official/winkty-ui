"use client";
import { Dock, useDockStore } from "@/components/library/test/dock";
import { AppWindow } from "@/components/library/test/dock/app-window";
import React, { useEffect, useState } from "react";

import Telegram from "@/components/icons/app-icons/telegram";
import DockerIcon from "@/components/icons/app-icons/docker";
import SlackIcon from "@/components/icons/app-icons/slack";
import MongoDBIcon from "@/components/icons/app-icons/mongodb";
import FigmaIcon from "@/components/icons/app-icons/figma";
import FinderIcon from "@/components/icons/app-icons/finder";
import SafariIcon from "@/components/icons/app-icons/safari";
import GoogleIcon from "@/components/icons/app-icons/google";
import Image from "next/image";
import trash from "@/components/icons/app-icons/trash.png";

function App() {
  const icons = [
    {
      id: "settings",
      name: "Settings",
      icon: (
        <FinderIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      id: "music",
      name: "Music",
      icon: (
        <SafariIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      id: "photos",
      name: "Photos",
      icon: (
        <GoogleIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      id: "terminal",
      name: "Figma",
      icon: (
        <FigmaIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    { id: "telegram", name: "Telegram", icon: <Telegram /> },
    {
      id: "docker",
      name: "Docker",
      icon: (
        <DockerIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      id: "slack",
      name: "Slack",
      icon: (
        <SlackIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      id: "mongodb",
      name: "MongoDB",
      icon: (
        <MongoDBIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      id: "figma",
      name: "Figma",
      icon: (
        <FigmaIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      id: "trash",
      name: "Telegram",
      icon: (
        <Image
          src={trash}
          alt="trash"
          width={50}
          height={50}
          className="h-full w-full text-neutral-500 dark:text-neutral-300"
        />
      ),
    },
  ];

  const dockRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    dockRef.current = document.body as HTMLDivElement;
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Dock>
        {icons?.map((icon) => (
          <AppWindow
            key={icon.id}
            title={icon.name}
            appId={icon.id}
            className="max-h-96 overflow-auto"
            iconProperties={icon}
            containerRef={dockRef}
          >
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{icon.name}</h2>
              <p className="text-sm text-neutral-400">
                This is a random UI content for {icon.name} application.
              </p>
              {Math.random() > 0.5 ? (
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Click Me
                </button>
              ) : (
                <input
                  type="text"
                  placeholder="Type something..."
                  className="mt-4 px-4 py-2 border rounded"
                />
              )}
            </div>
          </AppWindow>
        ))}
      </Dock>
    </div>
  );
}

export default App;
