import { TextRippleEffect } from "@/components/fancy/chromatic-ripple-effect/chromatic-ripple-effect";
import type { CodeExample } from "@/components/docs/code-examples";

export const usageExamples: CodeExample[] = [
  {
    title: "Basic Usage",
    description: "Simple text with ripple effect on mouse move",
    preview: (
      <div className="w-full  p-8 bg-background/95 rounded-lg">
        <TextRippleEffect className="text-3xl h-16 rounded-md w-full font-bold">
          Hover Me
        </TextRippleEffect>
      </div>
    ),
    code: `import { TextRippleEffect } from "@/components/ui/text-ripple-effect";

export function BasicExample() {
  return (
    <TextRippleEffect className="text-3xl font-bold">
      Hover Me
    </TextRippleEffect>
  );
}`,
  },
  {
    title: "Custom Colors",
    description: "Ripple effect with custom color and timing",
    preview: (
      <div className="w-full p-8 bg-background/95 rounded-lg">
        <TextRippleEffect
          rippleColor="#22c55e"
          rippleDuration={0.8}
          rippleSize={150}
          className="text-3xl font-bold text-green-500"
        >
          Interactive Text
        </TextRippleEffect>
      </div>
    ),
    code: `import { TextRippleEffect } from "@/components/ui/text-ripple-effect";

export function CustomExample() {
  return (
    <TextRippleEffect 
      rippleColor="#22c55e"
      rippleDuration={0.8}
      rippleSize={150}
      className="text-3xl font-bold text-green-500"
    >
      Interactive Text
    </TextRippleEffect>
  );
}`,
  },
];
