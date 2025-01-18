// Add "use client" at the top of the file
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { CheckCircle2, Download } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Your main functional component
export default function SuccessPage() {
  return (
    // Wrap the logic inside Suspense to handle CSR properly
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}

// The actual component that contains the business logic
function SuccessPageContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`/api/admissions/payment/${reference}`);
        if (response.ok) {
          const data = await response.json();
          setPaymentDetails(data);
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    if (reference) {
      fetchPaymentDetails();
    }
  }, [reference]);

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/admissions/form-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference }),
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'unifilm-admission-form.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download Started",
        description: "Your admission form is being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Please check your email for the form or contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <div className="space-y-2 text-muted-foreground">
            <p>Thank you for purchasing the admission form.</p>
            <p>Your reference number: <span className="font-mono">{reference}</span></p>
            <p>Please check your email for your admission form and further instructions.</p>
          </div>
          <div className="flex justify-center pt-4">
            <Button onClick={handleDownload} className="w-full sm:w-auto" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Form Now
            </Button>
          </div>
          <div className="space-y-2 pt-4">
            <p className="font-semibold">Next Steps:</p>
            <ul className="text-sm space-y-1">
              <li>1. Fill out the admission form completely</li>
              <li>2. Gather required documents (Valid ID and passport photos)</li>
              <li>3. Submit your completed application</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild variant="outline">
              <Link href="/admissions">
                Return to Admissions
              </Link>
            </Button>
            <Button asChild>
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}