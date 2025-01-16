import { CreditCard, Smartphone, Building2 } from "lucide-react";

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
  return (
    <div className="py-24 sm:py-32 bg-muted">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Payment Methods</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose from our flexible payment options to complete your admission process.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {paymentMethods.map((method) => (
            <div key={method.title} className="bg-card rounded-lg p-8 shadow-lg">
              <div className="mb-6">
                <method.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-4">{method.title}</h3>
              <ul className="space-y-2 mb-4">
                {method.details.map((detail, index) => (
                  <li key={index} className="text-muted-foreground">{detail}</li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">{method.instructions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}