import { Metadata } from "next";

export const AppTrayMetaData: Metadata = {
  title: "AppTray Component - Interactive React Dock with Animations",
  description:
    "A customizable React AppTray component featuring smooth Framer Motion animations, Zustand state management, and responsive mouse-tracking effects for modern web applications.",
    keywords: [
      "react app tray",
      "animated dock component",
      "framer motion animations",
      "zustand state management",
      "nextjs components",
      "interactive ui components",
      "react dock menu",
      "web app navigation",
      "mouse tracking effects",
      "modern ui components",
    ],
  authors: [
    {
      name: "Rabin | Avinash",
      url: process.env.BASE_URI,
    },
  ],
  openGraph: {
    title: "AppTray Component - Interactive React Dock with Animations",
    description:
      "A customizable React AppTray component featuring smooth Framer Motion animations, Zustand state management, and responsive mouse-tracking effects for modern web applications.",
    type: "website",
    url: `${process.env.BASE_URI}/components/app-tray`,
    images: [
      {
        url: `${process.env.BASE_URI}/components-img/app-tray-preview.png`,
        alt: "AppTray Component Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AppTray - UI Components",
    description:
      "A customizable React AppTray component featuring smooth Framer Motion animations, Zustand state management, and responsive mouse-tracking effects for modern web applications.",
    images: [`${process.env.BASE_URI}/components-img/app-tray-preview.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};