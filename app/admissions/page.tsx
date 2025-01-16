"use client";
import { useState } from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PaymentMethods } from "./components/payment-methods";
import { PaymentModal } from "@/app/admissions/components/payment-modal";
import { FileText, CheckCircle } from "lucide-react";

export default function AdmissionsPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [hasCompletedPayment, setHasCompletedPayment] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  const handlePaymentSuccess = () => {
    setHasCompletedPayment(true);
    // You might want to store this in localStorage or your backend
    localStorage.setItem('hasCompletedPayment', 'true');
  };

  return (
    <>
      <div data-aos="fade-up">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80"
              alt="Students walking on campus"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Join Our Creative Community
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-xl">
              Begin your journey in film, media, and technology at Unifilm College.
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

        {/* Contact for Availability Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950 mb-8">
                Contact for Availability
              </h2>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                {hasCompletedPayment ? (
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto min-w-[200px]"
                    asChild
                  >
                    <Link href="/documents/admission-form.pdf" target="_blank" download>
                      <FileText className="mr-2 h-5 w-5" />
                      Download Form
                    </Link>
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto min-w-[200px]"
                    onClick={() => setIsPaymentModalOpen(true)}
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Buy Form Online
                  </Button>
                )}

                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full sm:w-auto min-w-[200px]"
                  asChild
                >
                  <Link href="/contact">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Contact Us
                  </Link>
                </Button>
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
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
}