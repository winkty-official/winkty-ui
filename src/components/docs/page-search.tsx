"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CreditCard,
  Settings,
  User,
  File,
  Code,
  Star,
  Zap,
  Aperture,
  Circle,
  LayoutDashboard,
  Wand,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const pages = {
  Layout: [
    { name: "Layout", icon: <LayoutDashboard className="mr-2 h-4 w-4" />, path: "/components/layout" },
    { name: "Auth Form", icon: <User className="mr-2 h-4 w-4" />, path: "/components/auth-form" },
    { name: "Payment Form", icon: <CreditCard className="mr-2 h-4 w-4" />, path: "/components/payment-form" },
  ],
  Basic: [
    { name: "Autocomplete", icon: <Calendar className="mr-2 h-4 w-4" />, path: "/components/autocomplete" },
    { name: "Input", icon: <Code className="mr-2 h-4 w-4" />, path: "/components/input" },
    { name: "Radio", icon: <Circle className="mr-2 h-4 w-4" />, path: "/components/radio" },
    { name: "File Tree", icon: <File className="mr-2 h-4 w-4" />, path: "/components/file-tree" },
  ],
  Fancy: [
    { name: "Chromatic Ripple Effect", icon: <Zap className="mr-2 h-4 w-4" />, path: "/components/chromatic-ripple" },
    { name: "HighLight Article", icon: <Star className="mr-2 h-4 w-4" />, path: "/components/highlight-article" },
    { name: "Neon Pulse", icon: <Aperture className="mr-2 h-4 w-4" />, path: "/components/neon-pulse" },
    { name: "Particle Field", icon: <Wand className="mr-2 h-4 w-4" />, path: "/components/particle-field" },
  ],
};

export function PageSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);
  const router = useRouter();

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const toggleCommandPalette = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpenRef.current &&
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleCommandPalette();
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleCommandPalette]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Open Search (⌘K)
      </button>
      {isOpen && (
        <Command
          ref={commandRef}
          className="fixed top-1/4 left-1/2 transform -translate-x-1/2 rounded-lg border shadow-md w-full max-w-lg z-50 "
        >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.entries(pages).map(([category, items]) => (
              <CommandGroup key={category} heading={category}>
                {items.map((page) => (
                  <CommandItem
                    key={page.name}
                    onSelect={() => {
                      setIsOpen(false);
                      router.push(page.path);
                    }}
                  >
                    {page.icon}
                    <span>{page.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </>
  );
}
