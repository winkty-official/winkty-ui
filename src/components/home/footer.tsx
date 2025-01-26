import Link from "next/link";
import { Github, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-8 py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:items-start md:gap-2 md:px-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Your Logo</span>
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              Build beautiful components with shadcn/ui and Next.js
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/yourusername" target="_blank">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://twitter.com/yourusername" target="_blank">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </Link>{" "}
            and{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              className="font-medium underline underline-offset-4"
            >
              Next.js
            </Link>
          </p>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
