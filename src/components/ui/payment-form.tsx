"use client";

import { useState, SVGProps } from "react";
import { motion, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import payment from "payment";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number cannot exceed 19 digits")
    .regex(/^[0-9\s]+$/, "Card number must contain only digits"),
  cardHolder: z
    .string()
    .min(2, "Cardholder name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Cardholder name must contain only letters"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/(\d{2})$/, "Invalid expiry date format (MM/YY)")
    .refine((val) => {
      const [month, year] = val.split("/");
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    }, "Card has expired"),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV cannot exceed 4 digits")
    .regex(/^\d+$/, "CVV must contain only digits"),
  paymentMethod: z.string(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
});

function PaymentForm() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardType, setCardType] = useState<string>();
  console.log("🚀 ~ PaymentForm ~ cardType:", cardType);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      paymentMethod: "credit-card",
      address: "",
      city: "",
      country: "",
      postalCode: "",
    },
    mode: "onChange",
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/\D/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches?.[0] ?? "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="order-2 lg:order-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <InputField
                            {...field}
                            placeholder="1234 5678 9012 3456"
                            onChange={(e) => {
                              const formatted = formatCardNumber(
                                e.target.value,
                              );
                              field.onChange(formatted);
                              setCardType(payment.fns.cardType(formatted));
                            }}
                            maxLength={19}
                            className="font-mono pr-10" // Add padding to make space for the icon
                          />
                          {/* Card Icon */}
                          {cardType && (
                            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                              {cardType === "visa" && <VisaIcon />}
                              {cardType === "mastercard" && <MasterCardIcon />}
                              {cardType === "amex" && <AmexIcon />}
                              {/* Add more card types and icons as needed */}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardHolder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Holder</FormLabel>
                      <FormControl>
                        <InputField {...field} placeholder="John Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <InputField
                            {...field}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="font-mono"
                            onChange={(e) => {
                              let { value } = e.target;
                              value = value.replace(/\D/g, "");
                              if (value.length >= 2) {
                                value =
                                  value.slice(0, 2) + "/" + value.slice(2);
                              }
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <InputField
                            {...field}
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            placeholder="123"
                            className="font-mono"
                            onFocus={() => setIsFlipped(true)}
                            onBlur={() => setIsFlipped(false)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Billing Address</h3>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <InputField {...field} placeholder="123 Main St" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <InputField {...field} placeholder="New York" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <InputField {...field} placeholder="10001" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <InputField {...field} placeholder="United States" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </motion.div>
                ) : (
                  "Pay Now"
                )}
              </Button>
            </form>
          </Form>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:sticky top-8 order-1 lg:order-2"
        >
          <CardPreview
            cardNumber={form.watch("cardNumber")}
            cardHolder={form.watch("cardHolder")}
            expiryDate={form.watch("expiryDate")}
            cvv={form.watch("cvv")}
            isFlipped={isFlipped}
            cardType={cardType}
          />
        </motion.div>
      </div>
    </div>
  );
}

function CardPreview({
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
            "text-white",
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
            "text-white",
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

const MasterCardIcon = () => {
  return (
    <svg
      className="shrink-0"
      width={32}
      height={24}
      viewBox="0 0 32 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="24" rx="4" fill="#252525" />
      <path
        d="M19.0537 6.49742H12.9282V17.5026H19.0537V6.49742Z"
        fill="#FF5A00"
      />
      <path
        d="M13.3359 12C13.3359 9.76408 14.3871 7.77961 16 6.49741C14.8129 5.56408 13.3155 5 11.6822 5C7.81295 5 4.68221 8.13074 4.68221 12C4.68221 15.8693 7.81295 19 11.6822 19C13.3155 19 14.8129 18.4359 16 17.5026C14.3848 16.2385 13.3359 14.2359 13.3359 12Z"
        fill="#EB001B"
      />
      <path
        d="M27.3178 12C27.3178 15.8693 24.1871 19 20.3178 19C18.6845 19 17.1871 18.4359 16 17.5026C17.6333 16.2181 18.6641 14.2359 18.6641 12C18.6641 9.76408 17.6129 7.77961 16 6.49741C17.1848 5.56408 18.6822 5 20.3155 5C24.1871 5 27.3178 8.15113 27.3178 12Z"
        fill="#F79E1B"
      />
    </svg>
  );
};

export function VisaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="24" rx="4" fill="#1434CB" />
      <path d="M13.3333 16H11.6667L13.5 8H15.1667L13.3333 16Z" fill="white" />
      <path
        d="M20.3333 8.33333C19.8333 8.16667 19.1667 8 18.3333 8C16.5 8 15.1667 9 15.1667 10.3333C15.1667 11.3333 16.1667 11.8333 16.8333 12.1667C17.5 12.5 17.8333 12.6667 17.8333 13C17.8333 13.5 17.1667 13.6667 16.5 13.6667C15.8333 13.6667 15.1667 13.5 14.6667 13.3333L14.3333 13.1667L14 14.6667C14.5 14.8333 15.5 15.1667 16.5 15.1667C18.5 15.1667 19.8333 14.1667 19.8333 12.8333C19.8333 11.8333 19.1667 11.3333 18.1667 10.8333C17.5 10.5 17.1667 10.3333 17.1667 10C17.1667 9.66667 17.5 9.33333 18.3333 9.33333C19 9.33333 19.5 9.5 19.8333 9.66667L20.1667 9.83333L20.3333 8.33333Z"
        fill="white"
      />
      <path
        d="M22.8333 8H24.1667C24.5 8 24.6667 8.16667 24.8333 8.5L26.3333 16H24.6667L24.3333 14.8333H21.8333L21.5 16H19.6667L22.1667 8.66667C22.3333 8.16667 22.5 8 22.8333 8ZM23 10.6667L22.1667 13.5H23.8333L23 10.6667Z"
        fill="white"
      />
      <path
        d="M8.66667 8L7 13.6667L6.83333 12.8333C6.33333 11.3333 5 9.83333 3.5 9L5.16667 16H6.83333L9.83333 8H8.66667Z"
        fill="white"
      />
      <path
        d="M5.66667 8H3L3 8.16667C5.16667 8.66667 6.66667 10.1667 7.33333 12L6.66667 8.5C6.5 8.16667 6.16667 8 5.66667 8Z"
        fill="#F7B600"
      />
    </svg>
  );
}

export function AmexIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="24" rx="4" fill="#2E77BC" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3333 11.3333L15.1667 8H13.1667L15.5 13.6667H17L19.3333 8H17.3333L16.3333 11.3333Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.1667 8H20.1667L17.8333 13.6667H19.8333L20.3333 12.3333H22.8333L23.3333 13.6667H25.3333L23.1667 8ZM20.8333 11L21.6667 9L22.5 11H20.8333Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.16667 8L6.83333 13.6667H4.83333L3.33333 9.5L3.16667 8.83333C3 8.33333 2.5 8 2 8H2.16667L4.5 13.6667H6.5L9.83333 8H9.16667Z"
        fill="white"
      />
      <path d="M11.6667 8H9.66667V13.6667H11.6667V8Z" fill="white" />
    </svg>
  );
}

export default PaymentForm;
export { CardPreview, type CardPreviewProps };