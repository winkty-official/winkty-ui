"use client";

import React from "react";
import { motion } from "framer-motion";
import AreaRadioGroup from "./area-radio-group";

export interface LayoutSelectorProps {
  items: Array<{
    id: string;
    value: string;
    label: string;
    description: string;
  }>;
}

export function LayoutSelector({ items }: LayoutSelectorProps) {
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
        items={items}
        defaultValue="grid"
        onValueChange={setLayout}
      />
    </div>
  );
}
