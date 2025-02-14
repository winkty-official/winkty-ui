"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  feedbackFormSchema,
  contactFormSchema,
  type FeedbackFormValues,
  type ContactFormValues,
} from "./validations";

interface ContactFeedbackFormProps {
  type: "feedback" | "contact";
  onSubmit: (data: FeedbackFormValues | ContactFormValues) => Promise<void>;
  onSuccess: () => void;
}

export function ContactFeedbackForm({
  type,
  onSubmit,
  onSuccess,
}: ContactFeedbackFormProps) {
  const [rating, setRating] = useState(0);

  const form = useForm<FeedbackFormValues | ContactFormValues>({
    resolver: zodResolver(
      type === "feedback" ? feedbackFormSchema : contactFormSchema,
    ),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      ...(type === "feedback" ? { rating: 0 } : { subject: "" }),
    },
  });

  const handleSubmit = (data: FeedbackFormValues | ContactFormValues) => {
    onSuccess();
    onSubmit(data);

    form.reset();
    if (type === "feedback") {
      setRating(0);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === "contact" && (
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="What's this about?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message here..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === "feedback" && (
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 cursor-pointer ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() => {
                          setRating(star);
                          field.onChange(star);
                        }}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full">
          {type === "feedback" ? "Submit Feedback" : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
