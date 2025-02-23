"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Aperture,
  Calendar,
  Circle,
  Code,
  CreditCard,
  File,
  LayoutDashboard,
  Search,
  Star,
  User,
  Wand,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const pages = {
  "Getting Started": [
    {
      name: "Installation",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      path: "/components",
    },
  ],
  Layout: [
    {
      name: "Auth Form",
      icon: <User className="mr-2 h-4 w-4" />,
      path: "/components/auth-form",
    },
    {
      name: "Payment Form",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      path: "/components/payment-form",
    },
  ],
  Basic: [
    {
      name: "Autocomplete",
      icon: <Calendar className="mr-2 h-4 w-4" />,
      path: "/components/autocomplete",
    },
    {
      name: "Input",
      icon: <Code className="mr-2 h-4 w-4" />,
      path: "/components/input",
    },
    {
      name: "Radio",
      icon: <Circle className="mr-2 h-4 w-4" />,
      path: "/components/radio",
    },
    {
      name: "File Tree",
      icon: <File className="mr-2 h-4 w-4" />,
      path: "/components/file-tree",
    },
  ],
  Fancy: [
    {
      name: "Chromatic Ripple Effect",
      icon: <Zap className="mr-2 h-4 w-4" />,
      path: "/components/chromatic-ripple-effect",
    },
    {
      name: "HighLight Article",
      icon: <Star className="mr-2 h-4 w-4" />,
      path: "/components/highlighted-article",
    },
    {
      name: "Neon Pulse",
      icon: <Aperture className="mr-2 h-4 w-4" />,
      path: "/components/neon-pulse",
    },
    {
      name: "Particle Field",
      icon: <Wand className="mr-2 h-4 w-4" />,
      path: "/components/particle-field",
    },
  ],
};

export function PageSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);
  const commandInputRef = useRef<HTMLInputElement>(null);
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
    commandInputRef.current?.focus();
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
      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm 
        bg-background text-foreground hover:bg-accent hover:text-accent-foreground
        border border-input rounded-lg shadow-sm transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-[220px]"
    >
      <Search className="h-4 w-4" />
      <span>Search</span>
      <kbd className="ml-auto inline-flex items-center gap-1 rounded border border-input 
        bg-muted px-2 font-mono text-xs text-muted-foreground">
        ⌘K
      </kbd>
    </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[999999]"></div>
          <Command
            ref={commandRef}
            className="fixed h-fit top-1/4 left-1/2 transform -translate-x-1/2 rounded-lg border shadow-md w-full max-w-lg z-[999999] "
          >
            <CommandInput
              ref={commandInputRef}
              placeholder="Type a command or search..."
            />
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
            </CommandList>
          </Command>
        </>
      )}
    </>
  );
}
