"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Package, FileCode2 } from "lucide-react";
import { CodeBlock } from "@/components/home/code-block";
import { ManualInstall } from "@/components/base/radio/manual-install";

interface InstallationProps {
  pkg: {
    name: string;
    dependencies?: string[];
  };
  cli?: {
    command: string;
  };
  manual?: {
    files: Array<{
      name: string;
      code: string;
    }>;
  };
}

export function Installation({ pkg, cli, manual }: InstallationProps) {
  const npmCommand = `npm install ${pkg.name}${
    pkg.dependencies ? ` ${pkg.dependencies.join(" ")}` : ""
  }`;

  return (
    <Tabs defaultValue="cli">
      <TabsList className="mb-4">
        <TabsTrigger value="cli">
          <Terminal className="h-4 w-4 mr-2" />
          CLI
        </TabsTrigger>
        {manual && (
          <TabsTrigger value="manual">
            <FileCode2 className="h-4 w-4 mr-2" />
            Manual
          </TabsTrigger>
        )}
        <TabsTrigger value="npm">
          <Package className="h-4 w-4 mr-2" />
          npm
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cli">
        <CodeBlock code={cli?.command || ""} language="bash" />
      </TabsContent>

      {manual && (
        <TabsContent value="manual">
          <ManualInstall files={manual.files} />
        </TabsContent>
      )}

      <TabsContent value="npm">
        <CodeBlock code={npmCommand} language="bash" />
      </TabsContent>
    </Tabs>
  );
}
