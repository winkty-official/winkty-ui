"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import payment from "payment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { CardPreview } from "./card-preview";
import { VisaIcon, AmexIcon } from "@/components/icons/payment-icons";

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

export function PaymentForm() {
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
                          <Input
                            {...field}
                            placeholder="1234 5678 9012 3456"
                            onChange={(e) => {
                              const formatted = formatCardNumber(
                                e.target.value
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
                        <Input {...field} placeholder="John Doe" />
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
                          <Input
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
                          <Input
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
                        <Input {...field} placeholder="123 Main St" />
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
                          <Input {...field} placeholder="New York" />
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
                          <Input {...field} placeholder="10001" />
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
                        <Input {...field} placeholder="United States" />
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
