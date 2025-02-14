import { CodeBlock } from "@/components/home/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
}

interface CodeExamplesProps {
  examples: CodeExample[];
}

export function CodeExamples({ examples = [] }: CodeExamplesProps) {
  console.log("🚀 ~ CodeExamples ~ examples:", examples);
  if (!Array.isArray(examples)) {
    return null;
  }

  return (
    <div className="space-y-8">
      {examples.map((example, index) => (
        <div key={index} className="mb-8">
          <div className="mb-4">
            <h3 className="text-xl font-medium">{example.title}</h3>
            <p className="text-sm text-muted-foreground">
              {example.description}
            </p>
          </div>
          <ExampleWrapper preview={example.preview} code={example.code} />
        </div>
      ))}
    </div>
  );
}

function ExampleWrapper({
  preview,
  code,
}: {
  preview: React.ReactNode;
  code: string;
}) {
  return (
    <Tabs defaultValue="preview" className="relative w-full">
      <div className="flex justify-between w-full">
        <TabsList className="w-fit justify-start">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="preview"
        className="rounded-md border p-4 bg-dotted-pattern"
      >
        {preview}
      </TabsContent>
      <TabsContent value="code" className="border-none">
        <CodeBlock code={code} language="tsx" />
      </TabsContent>
    </Tabs>
  );
}
