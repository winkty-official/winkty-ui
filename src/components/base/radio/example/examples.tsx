import React from "react";
import CardSelector, { cardOptions } from "./card-selector";
import { ColorPicker } from "./color-picker";
import { LayoutSelector } from "./layout-selector";

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
}

const colorItems = [
  {
    id: "blue",
    value: "blue",
    label: "Ocean Blue",
    description: "Deep blue color",
    color: "#3B82F6",
  },
  {
    id: "red",
    value: "red",
    label: "Ruby Red",
    description: "Vibrant red shade",
    color: "#EF4444",
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
    title: "Payment Card Selection",
    description: "Select between different payment methods with right-aligned radio buttons",
    preview: <CardSelector cards={cardOptions} defaultSelected="card1" />,
    code: `import { AreaRadioGroup, RadioItem } from "@/components/ui/area-radio-group";

const cards = [
  {
    id: "card1",
    value: "card1",
    label: "Visa Card",
    lastFourDigits: "4242",
    expiryDate: "12/24",
    network: "visa",
    imageUrl: "/visa.png"
  },
  {
    id: "card2",
    value: "card2",
    label: "Mastercard",
    lastFourDigits: "8888",
    expiryDate: "08/25",
    network: "mastercard",
    imageUrl: "/mastercard.png"
  }
];

export function CardSelector({ cards }) {
  return (
    <AreaRadioGroup defaultValue="card1" className="flex flex-col gap-3">
      {cards.map((card) => (
        <RadioItem key={card.id} value={card.value} radioPosition="right">
          <div className="flex items-center gap-4">
            <div className="relative h-8 w-12 shrink-0">
              <Image
                src={card.imageUrl}
                alt={\`\${card.network} card\`}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <Label className="font-medium">
                {card.network} •••• {card.lastFourDigits}
              </Label>
              <p className="text-sm text-muted-foreground">
                Expires {card.expiryDate}
              </p>
            </div>
          </div>
        </RadioItem>
      ))}
    </AreaRadioGroup>
  );
}`,
  },
  {
    title: "Color Selection",
    description: "Interactive color picker with checkmark indicator",
    preview: <ColorPicker colors={colorItems} />,
    code: `import { AreaRadioGroup, RadioItem } from "@/components/ui/area-radio-group";

const colors = [
  {
    id: "red",
    value: "red",
    label: "Ruby Red",
    description: "Vibrant red shade",
    color: "#EF4444"
  }
];

export function ColorPicker({ colors }) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div className="space-y-4">
      <motion.div
        className="h-20 rounded-lg"
        animate={{ backgroundColor: selectedColor.color }}
        transition={{ duration: 0.2 }}
      />
      <AreaRadioGroup
        defaultValue={colors[0].value}
        className="flex-row gap-4"
        onValueChange={(value) => {
          const color = colors.find(c => c.value === value);
          if (color) setSelectedColor(color);
        }}
      >
        {colors.map((color) => (
          <RadioItem key={color.id} value={color.value} indicatorType="check">
            <div className="flex items-center gap-3">
              <div
                className="h-6 w-6 rounded-full border"
                style={{ backgroundColor: color.color }}
              />
              <div className="flex flex-col">
                <Label>{color.label}</Label>
                <p className="text-sm text-muted-foreground">
                  {color.description}
                </p>
              </div>
            </div>
          </RadioItem>
        ))}
      </AreaRadioGroup>
    </div>
  );
}`,
  },
  {
    title: "Layout Selection",
    description: "Switch between different layout options with border indicator",
    preview: <LayoutSelector items={layoutItems} />,
    code: `import { AreaRadioGroup, RadioItem } from "@/components/ui/area-radio-group";

const layouts = [
  {
    id: "grid",
    value: "grid",
    label: "Grid Layout",
    description: "Items arranged in a grid"
  }
];

export function LayoutSelector({ items }) {
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
        defaultValue="grid"
        onValueChange={setLayout}
        className="flex-row gap-4"
      >
        {items.map((item) => (
          <RadioItem key={item.id} value={item.value} indicatorType="border">
            <div className="flex flex-col">
              <Label>{item.label}</Label>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </RadioItem>
        ))}
      </AreaRadioGroup>
    </div>
  );
}`,
  },
];
