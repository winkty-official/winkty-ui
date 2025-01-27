import React from "react";
import CardSelector from "./card-selector";
import { ColorPicker } from "./color-picker";
import { LayoutSelector } from "./layout-selector";

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
}

// ... rest of the file
const cardItems = [
  {
    id: "personal",
    value: "personal",
    label: "Personal Card",
    description: "Perfect for individual use",
    imageUrl: "https://via.placeholder.com/32x24",
  },
  {
    id: "business",
    value: "business",
    label: "Business Card",
    description: "For small to large companies",
    imageUrl: "https://via.placeholder.com/32x24",
  },
];

const colorItems = [
  {
    id: "red",
    value: "red",
    label: "Ruby Red",
    description: "Vibrant red shade",
    color: "#EF4444",
  },
  {
    id: "blue",
    value: "blue",
    label: "Ocean Blue",
    description: "Deep blue color",
    color: "#3B82F6",
  },
];

const layoutItems = [
  {
    id: "grid",
    value: "grid",
    label: "Grid Layout",
    description: "Items arranged in a grid",
  },
  {
    id: "list",
    value: "list",
    label: "List Layout",
    description: "Items stacked vertically",
  },
];

export const usageExamples: CodeExample[] = [
  {
    title: "Card Selection",
    description: "Select between different card types with animations",
    preview: <CardSelector items={cardItems} />,
    code: `import { AreaRadioGroup } from "@/components/ui/area-radio-group";

const cards = [
  {
    id: "personal",
    value: "personal",
    label: "Personal Card",
    description: "Perfect for individual use",
    imageUrl: "/icons/personal-card.svg"
  },
  {
    id: "business",
    value: "business",
    label: "Business Card",
    description: "For small to large companies",
    imageUrl: "/icons/business-card.svg"
  }
];

export function CardSelector() {
  return (
    <AreaRadioGroup
      items={cards}
      defaultValue="personal"
      orientation="horizontal"
    />
  );
}`,
  },
  {
    title: "Color Selection",
    description: "Interactive color picker with preview",
    preview: <ColorPicker colors={colorItems} />,
    code: `import { useState } from "react";
import { AreaRadioGroup } from "@/components/ui/area-radio-group";

const colors = [
  {
    id: "red",
    value: "red",
    label: "Ruby Red",
    description: "Vibrant red shade",
    color: "#EF4444"
  },
  {
    id: "blue",
    value: "blue",
    label: "Ocean Blue",
    description: "Deep blue color",
    color: "#3B82F6"
  }
];

export function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div className="space-y-4">
      <div 
        className="h-20 rounded-lg"
        style={{ backgroundColor: selectedColor.color }}
      />
      <AreaRadioGroup
        items={colors}
        defaultValue={colors[0].value}
        onValueChange={(value) => {
          const color = colors.find(c => c.value === value);
          if (color) setSelectedColor(color);
        }}
      />
    </div>
  );
}`,
  },
  {
    title: "Layout Selection",
    description: "Switch between different layout options",
    preview: <LayoutSelector items={layoutItems} />,
    code: `import { useState } from "react";
import { AreaRadioGroup } from "@/components/ui/area-radio-group";

const layouts = [
  {
    id: "grid",
    value: "grid",
    label: "Grid Layout",
    description: "Items arranged in a grid"
  },
  {
    id: "list",
    value: "list",
    label: "List Layout",
    description: "Items stacked vertically"
  }
];

export function LayoutSelector() {
  const [layout, setLayout] = useState("grid");
  
  return (
    <div className="space-y-4">
      <div className={layout === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-muted h-20 rounded-lg" />
        ))}
      </div>
      <AreaRadioGroup
        items={layouts}
        defaultValue="grid"
        onValueChange={setLayout}
      />
    </div>
  );
}`,
  },
];
