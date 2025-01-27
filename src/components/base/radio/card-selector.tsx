"use client";

import React from "react";
import { motion } from "framer-motion";
import AreaRadioGroup from "./area-radio-group";
import type { RadioItem } from "./area-radio-group";

const CardSelector = ({ items }: { items: RadioItem[] }) => {
  return (
    <motion.div layout>
      <AreaRadioGroup
        items={items}
        defaultValue="personal"
        orientation="horizontal"
      />
    </motion.div>
  );
};

export default CardSelector;
