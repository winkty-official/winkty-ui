"use client";

import { ManualInstall } from "@/components/docs/manual-install";
import { CodeBlock } from "@/components/home/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegistryType } from "@/types/registry";
import { FileCode2, Terminal } from "lucide-react";
import { usePathname } from "next/navigation";
import { FeedbackFormValues } from "../contact-feedback-form/validations";
import { toast } from "sonner";
import ContactFeedbackFormModal from "../contact-feedback-form/contact-feedback-form-modal";

interface InstallationProps {
  cli?: { command: string };
  manual: RegistryType;
}

export function Installation({ cli, manual }: Readonly<InstallationProps>) {
  const pathname = usePathname();
  const onSubmit = async (values: FeedbackFormValues) => {
    console.log(values);

    const data = {
      ...values,
      componentName: pathname.split("/").at(-1),
    };

    await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Email sent successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });

    // form.reset();
  };
  return (
    <Tabs defaultValue="cli">
      <div className="flex justify-between w-full">
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
        <ContactFeedbackFormModal type="feedback" onSubmit={onSubmit} />
      </div>
      {cli && (
        <TabsContent value="cli" className="relative">
          <CodeBlock
            code={`npx shadcn@latest add ${cli.command}`}
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
