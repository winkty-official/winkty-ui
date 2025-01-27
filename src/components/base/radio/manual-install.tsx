"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/home/code-block";
import { Copy } from "lucide-react";

interface ManualInstallProps {
  code: string;
}

export function ManualInstall({ code }: ManualInstallProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground mb-2">
        Copy and paste the following code into your project.
      </p>
      <div className="relative">
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <CodeBlock code={code} language="tsx" />
        </ScrollArea>
        <Button
          size="sm"
          className="absolute top-2 right-2"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
