import { NeonPulse } from "@/components/fancy/neon-pulse/neon-pulse";
import type { CodeExample } from "@/components/docs/code-examples";

export const usageExamples: CodeExample[] = [
  {
    title: "Basic Usage",
    description: "Simple neon text with default magenta color",
    preview: (
      <div className="w-full p-8 bg-background/95 rounded-lg">
        <NeonPulse text="NEON" />
      </div>
    ),
    code: `import { NeonPulse } from "@/components/ui/neon-pulse";

export function BasicExample() {
  return <NeonPulse text="NEON" />;
}`,
  },
  {
    title: "Custom Colors",
    description: "Neon text with custom colors and timing",
    preview: (
      <div className="w-full p-8 bg-background/95 rounded-lg">
        <NeonPulse
          text="CYBER"
          color="#00ff00"
          glowColor="#00ff00"
          pulseDuration={1000}
        />
      </div>
    ),
    code: `import { NeonPulse } from "@/components/ui/neon-pulse";

export function CustomExample() {
  return (
    <NeonPulse 
      text="CYBER"
      color="#00ff00"
      glowColor="#00ff00"
      pulseDuration={1000}
    />
  );
}`,
  },
];
