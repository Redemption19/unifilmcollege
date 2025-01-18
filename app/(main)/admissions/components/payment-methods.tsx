"use client";
import { useState } from "react";
import { CreditCard, Smartphone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentModal } from "./payment-modal";

const paymentMethods = [
  {
    icon: Building2,
    title: "Bank Transfer",
    details: [
      "Bank: Ghana Commercial Bank (GCB)",
      "Account Name: Unifilm College",
      "Account Number: 1461440000205",
    ],
    instructions: "Make payments at any GCB branch. Send receipt copy to school email to receive admission form.",
  },
  {
    icon: Smartphone,
    title: "Mobile Money",
    details: [
      "Dial *170#",
      "Select option 2 (MomoPay)",
      "Merchant ID: 645801",
    ],
    instructions: "Enter amount and confirm with PIN. Send screenshot to school email to receive admission form.",
  },
  {
    icon: CreditCard,
    title: "Online Payment",
    details: [
      "Mobile Money",
      "AT Cash",
      "Telecel Cash",
    ],
    instructions: "Secure online payment through Paystack payment gateway.",
  },
];

export function PaymentMethods() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {paymentMethods.map((method, index) => (
        <div
          key={index}
          className="rounded-lg border bg-card p-6 space-y-4"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-full bg-primary/10">
              <method.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{method.title}</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {method.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
          <p className="text-sm">{method.instructions}</p>
          {method.title === "Online Payment" && (
            <Button 
              size="lg" 
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full sm:w-auto"
            >
              Buy Form Online
            </Button>
          )}
        </div>
      ))}

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
      />
    </div>
  );
}