import * as z from "zod";

export const feedbackFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true; // Allow undefined or empty
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      {
        message: "Please enter a valid email address",
      },
    ),
  message: z.string().min(10, "Message must be at least 10 characters"),
  rating: z.number().min(1).max(5).optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
