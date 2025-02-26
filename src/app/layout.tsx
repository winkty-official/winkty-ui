import Header from "@/components/home/header";
import { ThemeProvider } from "@/provider/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Winkty ui | The Modern Animation Library for React",
  description:
    "Create stunning, performant animations with the power of Framer Motion and GSAP combined. Build beautiful user experiences with our production-ready animation library.",
  keywords:
    "react animation, framer motion, gsap, animation library, react components, web animations",
  openGraph: {
    title: "Winkty ui | The Modern Animation Library for React",
    description:
      "Create stunning, performant animations with the power of Framer Motion and GSAP combined.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Winkty ui | The Modern Animation Library for React",
    description:
      "Create stunning, performant animations with the power of Framer Motion and GSAP combined.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
