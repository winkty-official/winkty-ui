"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DocsSidebarProps {
  className?: string;
}

const sidebarItems = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Components", href: "/docs/components" },
      { title: "Theming", href: "/docs/theming" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Radio Group", href: "/docs/components/radio" },
      { title: "Input", href: "/docs/components/input" },
      // Add more components
    ],
  },
];

export function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-64 shrink-0", className)}>
      <nav className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6">
        {sidebarItems.map((section, index) => (
          <div key={index} className="mb-6">
            <h4 className="mb-2 text-sm font-semibold">{section.title}</h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm hover:bg-muted",
                      pathname === item.href && "bg-muted font-medium"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
