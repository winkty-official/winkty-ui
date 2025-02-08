"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Check, Copy } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import { Button } from "../ui/button";

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

interface CodeBlockProps {
  code: string;
  packageUrl?: string; // Add packageUrl prop
  language: string;
  isExecutableCommand?: boolean;
}

export function CodeBlock({
  code,
  packageUrl,
  language,
  isExecutableCommand,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const textToCopy = code;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className=" border rounded-lg overflow-hidden relative">
      {/* Dropdown menu with Copy button */}
      {packageUrl ? (
        <PackageMangerSelectButton
          packageUrl={packageUrl}
          copied={copied}
          setCopied={setCopied}
          isExecutableCommand={isExecutableCommand}
        />
      ) : (
        <Button
          size={"sm"}
          className="absolute right-2 top-2 p-2 transition-colors z-50"
          onClick={() => copyToClipboard()}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      )}

      {/* Code Highlight Block */}
      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              "p-4 rounded-b-lg whitespace-pre-wrap overflow-x-auto",
              className
            )}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="text-gray-500 mr-4 select-none">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

const PackageMangerSelectButton = ({
  packageUrl,
  copied,
  setCopied,
  isExecutableCommand,
}: {
  packageUrl: string;
  copied: boolean;
  setCopied: (value: boolean) => void;
  isExecutableCommand?: boolean;
}) => {
  const copyToClipboard = async (packageManger: PackageManager) => {
    let textToCopy = packageUrl;

    switch (packageManger) {
      case "npm":
        textToCopy = isExecutableCommand
          ? `npx shadcn@latest add ${packageUrl}`
          : `npm install ${packageUrl}`;
        break;
      case "yarn":
        textToCopy = `yarn add ${packageUrl}`;
        break;
      case "pnpm":
        textToCopy = isExecutableCommand
          ? `pnpm dlx shadcn@latest add ${packageUrl}`
          : `pnpm add ${packageUrl}`;
        break;
      case "bun":
        textToCopy = isExecutableCommand
          ? `bunx shadcn@latest add ${packageUrl}`
          : `bun add ${packageUrl}`;
        break;
      default:
        textToCopy = packageUrl;
        break;
    }

    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          className="absolute right-2 top-2 p-2 transition-colors z-50"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" absolute -right-3 top-0 z-50">
        <DropdownMenuItem onClick={() => copyToClipboard("npm")}>
          npm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard("yarn")}>
          yarn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard("pnpm")}>
          pnpm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard("bun")}>
          bun
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
