import { cn } from "@/lib/utils";

interface PropDefinition {
  prop: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  definitions: PropDefinition[];
}

export function PropsTable({ definitions, ...props }: PropsTableProps) {
  return (
    <div
      {...props}
      className={cn("border rounded-lg overflow-hidden", props?.className)}
    >
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-4 font-medium">Prop</th>
            <th className="text-left p-4 font-medium">Type</th>
            <th className="text-left p-4 font-medium">Default</th>
            <th className="text-left p-4 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {definitions.map(
            ({ prop, type, default: defaultValue, description }) => (
              <tr key={prop} className="border-b">
                <td className="p-4 font-mono text-sm">{prop}</td>
                <td className="p-4 font-mono text-sm text-muted-foreground">
                  {type}
                </td>
                <td className="p-4 font-mono text-sm text-muted-foreground">
                  {defaultValue}
                </td>
                <td className="p-4 text-sm">{description}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
