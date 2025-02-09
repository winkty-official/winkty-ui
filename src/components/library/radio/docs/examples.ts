export interface ExampleItem {
  id: string;
  value: string;
  label: string;
  description: string;
  imageUrl?: string;
  color?: string;
}

export const exampleData = {
  cardItems: [
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
  ],
  colorItems: [
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
  ],
  layoutItems: [
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
  ],
  codeExamples: {
    cardSelection: `import { useState } from "react";
import { motion } from "framer-motion";
import { AreaRadioGroup } from "@/components/ui/area-radio-group";

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
    <motion.div layout>
      <AreaRadioGroup
        items={cards}
        defaultValue="personal"
        orientation="horizontal"
      />
    </motion.div>
  );
}`,
    colorSelection: `import { useState } from "react";
import { motion } from "framer-motion";
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
      <motion.div 
        className="h-20 rounded-lg"
        animate={{ backgroundColor: selectedColor.color }}
        transition={{ duration: 0.2 }}
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
    layoutSelection: `import { useState } from "react";
import { motion } from "framer-motion";
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
      <motion.div layout className="border rounded-lg p-4">
        <div className={layout === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              layout
              className="bg-muted h-20 rounded-lg"
            />
          ))}
        </div>
      </motion.div>
      <AreaRadioGroup
        items={layouts}
        defaultValue="grid"
        onValueChange={setLayout}
      />
    </div>
  );
}`,
  },
};
