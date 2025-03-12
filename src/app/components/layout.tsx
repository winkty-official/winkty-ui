"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface ComponentGroup {
  name: string;
  components: {
    name: string;
    path: string;
    isNew?: boolean;
  }[];
}

const componentGroups: ComponentGroup[] = [
  {
    name: "Getting Started",
    components: [{ name: "Installation", path: "" }],
  },
  {
    name: "Layout",
    components: [
      { name: "Auth Form", path: "auth-form" },
      { name: "Payment Form", path: "payment-form" },
      { name: "App Tray", path: "app-tray" },
      { name: "Tilt Card", path: "tilt-card", isNew: true },
    ],
  },
  {
    name: "Basic",
    components: [
      { name: "Autocomplete", path: "autocomplete" },
      { name: "Input", path: "input" },
      { name: "Radio", path: "radio" },
      { name: "File Tree", path: "file-tree" },
    ],
  },
  {
    name: "Fancy",
    components: [
      { name: "Chromatic Ripple Effect", path: "chromatic-ripple-effect" },
      { name: "HighLight Article", path: "highlighted-article" },
      { name: "Neon Pulse", path: "neon-pulse" },
      { name: "Particle Field", path: "particle-field" },
    ],
  },
];

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search] = useState("");
  const pathname = usePathname();

  const filteredGroups = componentGroups
    .map((group) => ({
      ...group,
      components: group.components.filter((component) =>
        component.name.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((group) => group.components.length > 0);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sticky top-[70px] h-[calc(100vh-70px)] w-64 border-r bg-[--sidebar-background]">
        <ScrollArea className="h-full">
          <div className="space-y-6 p-4">
            {filteredGroups.map((group) => (
              <div key={group.name}>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                  {group.name}
                </h3>
                <div className="space-y-1">
                  {group.components.map((component) => (
                    <Link
                      key={component.path}
                      href={`/components/${component.path}`}
                      className={cn(
                        "relative block w-full rounded-md px-2 py-1.5 text-left text-sm",
                        "hover:bg-accent hover:text-accent-foreground",
                        pathname === `/components/${component.path}` &&
                          "bg-accent text-accent-foreground",
                      )}
                    >
                      {component.name}
                      {component?.isNew ? (
                        <Badge className="absolute right-2 top-1/2 -translate-y-1/2 text-white">New</Badge>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}
