import { Metadata } from "next";

const InputPageMetadata = {
  title: "Input Component - Modern UI Form Controls",
  description: "A customizable, accessible input component for modern web applications. Features various styles, states, and validation options.",
  meta: {
    title: "Input Component | winkty UI Components Library",
    description: "Build better forms with our accessible, customizable Input component. Supports various styles, states, validation, and seamless integration.",
    keywords: "input component, form control, text field, accessible input, React input, UI components, form validation, custom input styles, web forms, user interface",
    authors: [{ name: "winkty UI Team" }],
    openGraph: {
      type: "website",
      title: "Input Component | winkty UI Components Library",
      description: "Build better forms with our accessible, customizable Input component. Supports various styles, states, validation, and seamless integration.",
      siteName: "winkty UI",
      locale: "en_US",
      images: [{
        url: "/og/input-component.png",
        width: 1200,
        height: 630,
        alt: "winkty UI Input Component Preview"
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: "Input Component | winkty UI Components Library",
      description: "Build better forms with our accessible, customizable Input component. Supports various styles, states, validation, and seamless integration.",
      images: ["/og/input-component.png"],
      creator: "@winkty-official"
    },
    category: "UI Components",
  } as Metadata
} as const;

export default InputPageMetadata;
