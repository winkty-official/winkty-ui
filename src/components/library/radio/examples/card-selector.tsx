"use client";
import React from "react";
import { motion } from "framer-motion";
import AreaRadioGroup, { RadioItem } from "../../../ui/radio";
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
          <RadioItem key={card.id} value={card.value}>
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
          </RadioItem>
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
