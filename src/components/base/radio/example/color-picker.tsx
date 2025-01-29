"use client";

import React from "react";
import { motion } from "framer-motion";
import AreaRadioGroup, { RadioItem } from "../area-radio-group";
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

export function ColorPicker({ colors }: ColorPickerProps) {
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
          <RadioItem 
            key={color.id} 
            value={color.value}
            indicatorType="check"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-6 w-6 rounded-full border"
                style={{ backgroundColor: color.color }}
              />
              <div className="flex flex-col">
                <Label>{color.label}</Label>
                <p className="text-sm text-muted-foreground">{color.description}</p>
              </div>
            </div>
          </RadioItem>
        ))}
      </AreaRadioGroup>
    </div>
  );
}
