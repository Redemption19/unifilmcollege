"use client";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePaystackPayment } from "react-paystack";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: 10000, // Amount in pesewas (100 GHS = 10000 pesewas)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    currency: "GHS", // Specify Ghana Cedis as currency
    channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: fullName,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone",
          value: phone,
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const handleSuccess = async (reference: any) => {
    try {
      // 1. Save payment details to your database
      const response = await fetch("/api/admissions/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reference: reference.reference,
          email,
          fullName,
          phone,
          amount: 10000,
          status: "successful",
        }),
      });

      if (!response.ok) throw new Error("Failed to save payment");

      // 2. Show success message
      toast({
        title: "Payment Successful!",
        description: "Check your email for your admission form and further instructions.",
      });

      // 3. Clear form
      setEmail("");
      setFullName("");
      setPhone("");

      // 4. Close modal
      onClose();

      // 5. Redirect to success page
      router.push(`/admissions/success?reference=${reference.reference}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Payment successful but couldn't save details. Please contact support.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    toast({
      title: "Payment Cancelled",
      description: "You have cancelled the payment.",
      variant: "destructive",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !fullName || !phone) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }

      // Close the modal before initializing Paystack
      onClose();

      // Small delay to ensure modal is closed
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Initialize Paystack payment
      initializePayment({
        onSuccess: handleSuccess,
        onClose: handleClose,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-lg p-6 bg-white">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Buy Admission Form</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Fill in your details to purchase the admission form
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="font-semibold">100 GHS</div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full flex justify-center items-center"
              >
                {loading ? (
                  <div className="spinner"></div> // Add a simple spinner or a loading component
                ) : (
                  "Proceed to Pay"
                )}
              </Button>

            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
