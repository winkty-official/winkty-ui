"use client";

import React from "react";
import { motion } from "framer-motion";
import AreaRadioGroup from "../area-radio-group";

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
        items={colors}
        defaultValue={colors[0].value}
        onValueChange={(value) => {
          const color = colors.find((c) => c.value === value);
          if (color) setSelectedColor(color);
        }}
      />
    </div>
  );
}
