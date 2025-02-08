"use client";

import { ManualInstall } from "@/components/docs/manual-install";
import { CodeBlock } from "@/components/home/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode2, Terminal } from "lucide-react";

interface InstallationProps {
  cli?: { command: string };
  manual: {
    name: string;
    type: string;
    dependencies: string[];
    files: {
      name: string;
      type: string;
      path: string;
      content: string;
      target: string;
    }[];
    styles?: {
      name: string;
      type: string;
      content: string;
      target: string;
    }[];
    author: string;
    title: string;
    description: string;
    featiures?: string[];
    version?: string;
    license?: string;
  };
}

export function Installation({ cli, manual }: InstallationProps) {
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
      </TabsList>

      {cli && (
        <TabsContent value="cli" className="relative">
          <CodeBlock
            code={`npx shadcn@latest add ${cli.command}` || ""}
            language="bash"
            isExecutableCommand
            packageUrl={cli.command}
          />
        </TabsContent>
      )}

      <TabsContent value="manual">
        <ManualInstall {...manual} />
      </TabsContent>
    </Tabs>
  );
}
