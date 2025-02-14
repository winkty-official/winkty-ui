"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ContactFeedbackForm } from ".";
import { ContactFormValues, FeedbackFormValues } from "./validations";
import { useState } from "react";

interface ContactFeedbackFormModalProps {
  type: "feedback" | "contact";
  onSubmit: (data: FeedbackFormValues | ContactFormValues) => Promise<void>;
}

export default function ContactFeedbackFormModal({
  type,
  onSubmit,
}: ContactFeedbackFormModalProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="outline" className="uppercase">
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <ContactFeedbackForm
          type={type}
          onSubmit={onSubmit}
          onSuccess={() => setOpenModal(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
