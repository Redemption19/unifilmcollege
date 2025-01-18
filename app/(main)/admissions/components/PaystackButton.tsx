'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PaystackButtonProps {
  email: string;
  amount: number;
  metadata: {
    full_name: string;
    phone: string;
  };
  onStart?: () => void;
  onClose?: () => void;
  onSuccess?: () => void;
}

export function PaystackButton({ 
  email, 
  amount, 
  metadata,
  onStart,
  onClose,
  onSuccess 
}: PaystackButtonProps) {
  const [loading, setLoading] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  useEffect(() => {
    const loadPaystack = async () => {
      try {
        await import('@paystack/inline-js');
        setPaystackLoaded(true);
      } catch (error) {
        console.error('Failed to load Paystack:', error);
        toast.error('Failed to load payment system');
      }
    };

    loadPaystack();
  }, []);

  const handlePayment = async () => {
    try {
      console.log('Starting payment process...');
      setLoading(true);
      onStart?.();

      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error('Paystack public key not found');
      }

      const PaystackPop = (await import('@paystack/inline-js')).default;
      const paystack = new PaystackPop();
      console.log('Paystack instance created');

      paystack.newTransaction({
        key: publicKey,
        email,
        amount: amount * 100,
        currency: 'GHS',
        channels: ['mobile_money', 'card'],
        metadata: {
          custom_fields: [
            {
              display_name: "Full Name",
              variable_name: "full_name",
              value: metadata.full_name
            },
            {
              display_name: "Phone Number",
              variable_name: "phone",
              value: metadata.phone
            }
          ]
        },
        onSuccess: (transaction: any) => {
          console.log('Payment successful:', transaction);
          toast.success('Payment successful! Check your email for the form.');
          onSuccess?.();
          setLoading(false);
        },
        onCancel: () => {
          console.log('Payment cancelled by user');
          toast.error('Payment cancelled');
          setLoading(false);
          onClose?.();
        },
        onError: (error: Error) => {
          console.error('Paystack error:', error);
          toast.error('Payment failed: ' + error.message);
          setLoading(false);
          onClose?.();
        }
      });

      console.log('Transaction initialized');

    } catch (error) {
      console.error('Payment initialization error:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
      toast.error('Failed to initialize payment');
      setLoading(false);
      onClose?.();
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      size="lg" 
      disabled={loading || !paystackLoaded}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : !paystackLoaded ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        `Pay GHS ${amount}`
      )}
    </Button>
  );
} 