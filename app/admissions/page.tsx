"use client";

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, CheckCircle } from "lucide-react";
import { PaymentMethods } from "./components/payment-methods";

// Dynamically import components that use window
const PaymentModal = dynamic(
  () => import('./components/payment-modal').then(mod => mod.PaymentModal),
  { ssr: false }
);

export default function AdmissionsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize AOS only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const AOS = require('aos');
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
      });
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="/images/admissions-hero.jpg"
            alt="Students in a classroom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white mt-1">
            Begin Your Creative Journey
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300 max-w-xl">
            Take the first step towards your future in film, media, and technology.
          </p>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="py-24 sm:py-32" data-aos="fade-up" data-aos-delay="200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">Admission Requirements</h2>
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Valid ID</h3>
                    <p className="text-muted-foreground">A government-issued identification document</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Passport Photos</h3>
                    <p className="text-muted-foreground">Two recent passport-sized photographs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FileText className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Application Form</h3>
                    <p className="text-muted-foreground">Complete the admission form after payment (100 GHS)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentMethods />

      {/* Hostel Information */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Hostel Facilities</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Comfortable accommodation is available for students at 350 GHS per month.
            </p>
            <div className="mt-10">
              <Button size="lg">Contact for Availability</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onSuccess={() => {
            setIsPaymentModalOpen(false);
          }}
        />
      )}
    </>
  );
}