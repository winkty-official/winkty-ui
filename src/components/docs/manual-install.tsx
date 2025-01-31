"use client";
import { CodeBlock } from "@/components/home/code-block";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ManualInstallProps {
  name: string;
  type: string;
  dependencies: string[];
  files: { name: string; content: string; dir: string }[];
  author: string;
  title: string;
  description: string;
}

export function ManualInstall({ dependencies, files }: ManualInstallProps) {
  return (
    <div className="mb-4 space-y-5">
      <p className="text-sm text-muted-foreground mb-2">
        Copy and paste the following code into your project.
      </p>

      {dependencies && (
        <div className="">
          <h4 className="mb-4">Install dependencies</h4>
          <div className="relative">
            <CodeBlock
              code={`npm i ${dependencies.join(" ")}`}
              language="bash"
              packageUrl={dependencies.join(" ")}
            />
          </div>
        </div>
      )}

      <div className="relative space-y-2">
        <h4>Copy the source code</h4>
        {files.map((file, index) => (
          <div key={index}>
            <h5 className="text-sm mb-2 p-1 px-2 bg-primary/20 rounded-md w-fit text-white/80">
              {file.dir}
            </h5>
            <ScrollArea className=" h-[400px]  w-full rounded-md border relative overflow-x-auto">
              <CodeBlock code={file.content} language="tsx" />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
}
