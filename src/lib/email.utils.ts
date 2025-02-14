import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { formatDate } from "./formatDate";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: process.env.NODE_ENV === "production",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
} as SMTPTransport.Options);

export type SendEmailProps = {
  name: string;
  email: string;
  message: string;

  subject?: string;
  rating?: number;
  componentName?: string;
};

export const sendEmail = async (values: SendEmailProps) => {
  const { name, email, message, rating, subject, componentName } = values;

  const fomatedDate = formatDate(new Date());

  return await transporter.sendMail({
    from: {
      name: "Winkty",
      address: process.env.APP_EMAIL!,
    },
    to: [process.env.APP_EMAIL!],
    subject: subject || "Feedback Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nSubmission Date: ${fomatedDate}\nMessage: ${message}\nComponent: ${componentName || "N/A"}\nRating: ${rating || "N/A"}`,
  });
};
