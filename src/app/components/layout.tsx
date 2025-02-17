"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ComponentGroup {
  name: string;
  components: {
    name: string;
    path: string;
  }[];
}

const componentGroups: ComponentGroup[] = [
  {
    name: "Layout",
    components: [
      { name: "Auth Form", path: "auth-form" },
      { name: "Payment Form", path: "payment-form" },
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
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const filteredGroups = componentGroups
    .map((group) => ({
      ...group,
      components: group.components.filter((component) =>
        component.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.components.length > 0);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/30">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-4 space-y-6">
            {filteredGroups.map((group) => (
              <div key={group.name}>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                  {group.name}
                </h3>
                <div className="space-y-1">
                  {group.components.map((component) => (
                    <Link
                      key={component.path}
                      href={`/components/${component.path}`}
                      className={cn(
                        "block w-full text-left px-2 py-1.5 text-sm rounded-md",
                        "hover:bg-accent hover:text-accent-foreground",
                        pathname === `/components/${component.path}` &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      {component.name}
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
