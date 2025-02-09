"use client";

import React from "react";
import { motion } from "framer-motion";
import AreaRadioGroup, { RadioItem } from "../";
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
          <RadioItem key={item.id} value={item.value}>
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
}
