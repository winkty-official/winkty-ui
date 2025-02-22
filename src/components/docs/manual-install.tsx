"use client";
import { CodeBlock } from "@/components/home/code-block";
import { RegistryType } from "@/types/registry";
import Link from "next/link";
import { Badge } from "../ui/badge";

export function ManualInstall({
  dependencies,
  files,
  registryDependencies,
}: Readonly<RegistryType>) {
  return (
    <div className="mb-4 space-y-5">
      <p className="text-sm text-muted-foreground mb-2">
        Copy and paste the following code into your project.
      </p>

      {registryDependencies?.filter((i) => i != "utils")?.length ? (
        <div>
          <h4 className="mb-4">Install Shadcn Dependencies</h4>
          <p className=" flex items-center space-x-2">
            This component depends on Shadcn
            {registryDependencies
              .filter((i) => i != "utils")
              .map((dependency) => (
                <Link
                  className="first:ml-2"
                  key={dependency}
                  href={`${process.env.NEXT_PUBLIC_SHADCN_BASE_URI}/${dependency}`}
                >
                  <Badge variant={"secondary"}>
                    <span className="text-sm font-mono capitalize">
                      &lt;{dependency} /&gt;
                    </span>
                  </Badge>
                </Link>
              ))}
            {"."}
          </p>
        </div>
      ) : null}

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
        {files.map((file) => (
          <div key={file.path}>
            <h5 className="text-sm mb-2 p-1 px-2 bg-primary/20 rounded-md w-fit text-white/80">
              {file.path}
            </h5>
              <CodeBlock code={file.content} language="tsx" />
          </div>
        ))}
      </div>
    </div>
  );
}
