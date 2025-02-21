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
    code: `"use client";
import React from "react";
import { motion } from "framer-motion";
import AreaRadioGroup, { AreaRadioItem } from "../../../ui/area-radio";
import { Label } from "@/components/ui/label";
import { MastercardIcon } from "@/components/icons/payment/mastercard-icon";
import { VisaIcon } from "@/components/icons/payment-icons";
import AmexIcon from "@/assets/icons/payment/amex.svg";
import Image from "next/image";

interface CardOption {
  id: string;
  value: string;
  label: string;
  lastFourDigits: string;
  expiryDate: string;
  network: "visa" | "mastercard" | "amex";
}

interface CardSelectorProps {
  cards: CardOption[];
  defaultSelected?: string;
  onCardChange?: (value: string) => void;
}

const CardSelector = ({
  cards,
  defaultSelected,
  onCardChange,
}: CardSelectorProps) => {
  const getCardIcon = (network: string) => {
    switch (network) {
      case "visa":
        return <VisaIcon className="w-12 h-8" />;
      case "mastercard":
        return <MastercardIcon className="w-12 h-8" />;
      case "amex":
        return (
          <Image
            src={AmexIcon}
            className="w-12 h-8 object-cover"
            width={48}
            height={32}
            alt="asdf"
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div layout>
      <AreaRadioGroup
        defaultValue={defaultSelected ?? cards[0].value}
        onValueChange={onCardChange}
        className="flex flex-col gap-3"
      >
        {cards.map((card) => (
          <AreaRadioItem key={card.id} value={card.value}>
            <div className="flex items-center gap-4">
              <div className="shrink-0">{getCardIcon(card.network)}</div>
              <div className="flex flex-col items-start">
                <Label className="font-medium">
                  {card.network.charAt(0).toUpperCase() + card.network.slice(1)}{" "}
                  •••• {card.lastFourDigits}
                </Label>
                <p className="text-sm text-muted-foreground">
                  Expires {card.expiryDate}
                </p>
              </div>
            </div>
          </AreaRadioItem>
        ))}
      </AreaRadioGroup>
    </motion.div>
  );
};

// Example usage:
export const cardOptions: CardOption[] = [
  {
    id: "card1",
    value: "card1",
    label: "Visa Card",
    lastFourDigits: "4242",
    expiryDate: "12/24",
    network: "visa",
  },
  {
    id: "card2",
    value: "card2",
    label: "Mastercard",
    lastFourDigits: "8888",
    expiryDate: "08/25",
    network: "mastercard",
  },
  {
    id: "card3",
    value: "card3",
    label: "American Express",
    lastFourDigits: "3333",
    expiryDate: "03/26",
    network: "amex",
  },
];

export default CardSelector;
`,
  },
  {
    title: "Color Selection",
    description: "Interactive color picker with checkmark indicator",
    preview: <ColorPicker colors={colorItems} />,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";
import AreaRadioGroup, { AreaRadioItem } from "@/components/ui/area-radio";
import { Label } from "@/components/ui/label";

export interface ColorPickerProps {
  colors: Array<{
    id: string;
    value: string;
    label: string;
    description: string;
    color: string;
  }>;
}

export function ColorPicker({ colors }: Readonly<ColorPickerProps>) {
  const [selectedColor, setSelectedColor] = React.useState(colors[0]);

  return (
    <div className="space-y-4">
      <motion.div
        className="h-20 rounded-lg"
        animate={{ backgroundColor: selectedColor.color }}
        transition={{ duration: 0.2 }}
      />
      <AreaRadioGroup
        defaultValue={colors[0].value}
        onValueChange={(value) => {
          const color = colors.find((c) => c.value === value);
          if (color) setSelectedColor(color);
        }}
        className="flex-row gap-4"
      >
        {colors.map((color) => (
          <AreaRadioItem key={color.id} value={color.value}>
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
          </AreaRadioItem>
        ))}
      </AreaRadioGroup>
    </div>
  );
}
`,
  },
  {
    title: "Layout Selection",
    description: "Switch between different layout options with border indicator",
    preview: <LayoutSelector items={layoutItems} />,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";
import AreaRadioGroup, { AreaRadioItem } from "@/components/ui/area-radio";
import { Label } from "@/components/ui/label";

export interface LayoutSelectorProps {
  items: Array<{
    id: string;
    value: string;
    label: string;
    description: string;
  }>;
}

export function LayoutSelector({ items }: Readonly<LayoutSelectorProps>) {
  const [layout, setLayout] = React.useState("grid");

  return (
    <div className="space-y-4">
      <motion.div layout className="border rounded-lg p-4">
        <div
          className={layout === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}
        >
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
          <AreaRadioItem key={item.id} value={item.value}>
            <div className="flex flex-col">
              <Label>{item.label}</Label>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </AreaRadioItem>
        ))}
      </AreaRadioGroup>
    </div>
  );
}
`,
  },
];
