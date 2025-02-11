"use client";

import { motion, useAnimation } from "framer-motion";
import { CreditCard, Ship as Chip } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface CardPreviewProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  isFlipped: boolean;
  cardType?: string;
}

export function CardPreview({
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
  isFlipped,
  cardType,
}: Readonly<CardPreviewProps>) {
  const controls = useAnimation();
  const cvvCardControls = useAnimation();

  useEffect(() => {
    controls.start({
      rotateY: isFlipped ? 180 : 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    });
    cvvCardControls.start({
      rotateY: isFlipped ? 180 : 0,
      opacity: isFlipped ? 1 : 0,
      transition: { duration: 0, delay: 0.3 },
    });
  }, [isFlipped, controls, cvvCardControls]);

  const cardBrandLogo = () => {
    switch (cardType?.toLowerCase()) {
      case "visa":
        return "VISA";
      case "mastercard":
        return "MASTERCARD";
      case "amex":
        return "AMEX";
      default:
        return <CreditCard className="w-8 h-8 md:w-12 md:h-12" />;
    }
  };

  const reversedCvv = cvv.split("").reverse().join("");

  return (
    <div className="w-full max-w-[450px] mx-auto perspective-1000">
      <motion.div
        className="relative w-full"
        style={{ aspectRatio: "1.59/1" }}
        initial={false}
        animate={controls}
      >
        {/* Front of card */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-xl p-4 md:p-6",
            "bg-gradient-to-br from-primary/90 to-primary/40",
            "backdrop-blur-sm shadow-xl",
            "transform-style-3d backface-hidden",
            "text-white"
          )}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <Chip className="w-8 h-8 md:w-12 md:h-12" />
              <div className="text-lg md:text-2xl font-bold">
                {cardBrandLogo()}
              </div>
            </div>

            <div className="space-y-2 md:space-y-4">
              <motion.p
                className="text-lg md:text-2xl tracking-wider font-mono"
                layout
              >
                {cardNumber || "•••• •••• •••• ••••"}
              </motion.p>

              <div className="flex justify-between items-end text-sm md:text-base">
                <div className="space-y-1">
                  <p className="text-xs opacity-80">Card Holder</p>
                  <motion.p
                    className="font-medium truncate max-w-[150px] md:max-w-[200px]"
                    layout
                  >
                    {cardHolder || "YOUR NAME"}
                  </motion.p>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-xs opacity-80">Expires</p>
                  <motion.p className="font-medium" layout>
                    {expiryDate || "MM/YY"}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-xl",
            "bg-gradient-to-br from-primary/90 to-primary/40",
            "backdrop-blur-sm shadow-xl",
            "transform-style-3d backface-hidden rotate-y-180",
            "text-white"
          )}
          initial={{
            opacity: 0,
          }}
          animate={cvvCardControls}
        >
          <div className="w-full h-8 md:h-12 bg-black/30 mt-6 md:mt-8" />
          <div className="mt-4 md:mt-8 px-4 md:px-6">
            <div className="flex justify-end items-center h-8 md:h-10">
              <div className="bg-white/20 backdrop-blur-sm rounded px-3 md:px-4 py-1 md:py-2">
                <p className="font-mono text-sm md:text-base tracking-wider">
                  {reversedCvv || "•••"}
                </p>
              </div>
            </div>
            <p className="text-xs md:text-sm mt-2 text-right opacity-80 ">
              This card is issued by Your Bank Name
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
