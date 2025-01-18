"use client";

import { useState } from "react";
import Image from "next/image";
import { PaymentMethods } from "./components/payment-methods";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IdCard, ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentModal } from "./components/payment-modal";

export default function AdmissionsPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="/images/admission-hero.jpg"
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="requirements" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>

          {/* Requirements Tab */}
          <TabsContent value="requirements">
            <Card>
              <CardHeader>
                <CardTitle>Admission Requirements</CardTitle>
                <CardDescription>
                  Required documents for admission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-start gap-4 p-4 rounded-lg border">
                    <IdCard className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Valid ID</h3>
                      <p className="text-sm text-muted-foreground">
                        A government-issued identification card
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg border">
                    <ImageIcon className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Passport Photos</h3>
                      <p className="text-sm text-muted-foreground">
                        Two recent passport-sized photographs
                      </p>
                    </div>
                  </div>
                </div>
                {/* Add Buy Form Button */}
                <div className="flex justify-center pt-4">
                  <Button 
                    size="lg" 
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    Buy Form Online
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentMethods />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payment Modal */}
        <PaymentModal 
          isOpen={isPaymentModalOpen} 
          onClose={() => setIsPaymentModalOpen(false)} 
        />
      </div>
    </div>
  );
}