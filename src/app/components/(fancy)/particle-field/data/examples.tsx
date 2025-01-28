import type { CodeExample } from "@/components/docs/code-examples";
import {
  BasicParticleField,
  IntermediateParticleField,
  AdvancedParticleField,
} from "./previews";

export const usageExamples: CodeExample[] = [
  {
    title: "Basic Usage",
    description: "Simple particle field with default configuration",
    preview: <BasicParticleField />,
    code: `import { ParticleField } from "@/components/ui/particle-field";

export function BasicParticleField() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden">
      <ParticleField
        particleCount={30}
        colors={["#4f46e5", "#0ea5e9"]}
        minSize={3}
        maxSize={5}
      />
    </div>
  );
}`,
  },
  {
    title: "Intermediate Usage",
    description: "Particle field with custom animations and glow effects",
    preview: <IntermediateParticleField />,
    code: `import { ParticleField } from "@/components/ui/particle-field";

export function IntermediateParticleField() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden">
      <ParticleField
        particleCount={50}
        colors={["#22c55e", "#eab308", "#ec4899"]}
        minSize={4}
        maxSize={8}
        glowIntensity={15}
        expandScale={1.8}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-lg bg-background/80 p-6 backdrop-blur">
          <h3 className="text-xl font-semibold">Hover Me</h3>
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    title: "Advanced Usage",
    description: "Complex interactive background with dynamic content",
    preview: <AdvancedParticleField />,
    code: `import { ParticleField } from "@/components/ui/particle-field";

export function AdvancedParticleField() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden">
      <ParticleField
        particleCount={100}
        colors={[
          "hsl(var(--primary))",
          "hsl(var(--secondary))",
          "hsl(var(--accent))",
        ]}
        minSize={2}
        maxSize={6}
        glowIntensity={20}
        expandScale={2}
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid w-full max-w-lg gap-4 p-6">
          <div className="space-y-2 rounded-lg bg-background/95 p-4 backdrop-blur">
            <h3 className="text-lg font-semibold">Interactive Card</h3>
            <p className="text-sm text-muted-foreground">
              Hover over the particles to see them react
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-background/95 p-4 backdrop-blur">Card 1</div>
            <div className="rounded-lg bg-background/95 p-4 backdrop-blur">Card 2</div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  },
];
