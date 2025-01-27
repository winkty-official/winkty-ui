import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/home/code-block";

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
          <Card className="p-6">
            <div className="mb-4">{example.preview}</div>
            <CodeBlock code={example.code} language="tsx" />
          </Card>
        </div>
      ))}
    </div>
  );
}
