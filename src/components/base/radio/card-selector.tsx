"use client";

import React from "react";
import { motion } from "framer-motion";
import type { RadioItem } from "./area-radio-group";
import AreaRadioGroup from "./area-radio-group";

export function CardSelector({ items }: { items: RadioItem[] }) {
  return (
    <motion.div layout>
      <AreaRadioGroup
        items={items}
        defaultValue="personal"
        orientation="horizontal"
      />
    </motion.div>
  );
}
