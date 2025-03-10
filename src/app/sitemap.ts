import { LIBRARY_COMPONENTS } from "@/config/library-components";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ui.winkty.com",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://ui.winkty.com/components",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.99,
    },
    ...LIBRARY_COMPONENTS.map((component, index) => ({
      url: `https://ui.winkty.com/components/${component}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as
        | "weekly"
        | "always"
        | "hourly"
        | "daily"
        | "monthly"
        | "yearly"
        | "never"
        | undefined,
      priority: parseFloat((0.98 - index * 0.01).toFixed(2)),
    })),
  ];
}
