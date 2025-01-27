interface AccessibilityProps {
  features: string[];
}

export function Accessibility({ features }: AccessibilityProps) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  );
}
