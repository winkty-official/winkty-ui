import PaymentForm from "@/components/ui/payment-form";

export const examples = [
  {
    title: "Payment Form",
    description: "A form for processing payments.",
    preview: (
      <div className="flex flex-col gap-4">
        <PaymentForm />
      </div>
    ),
    code: `
    import React from 'react'
    
    function Form() {
      return (          
        <PaymentForm />
      )
    }
    
    export default Form
    `,
  },
];
