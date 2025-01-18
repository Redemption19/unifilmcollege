declare module '@paystack/inline-js' {
  interface PaystackOptions {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    channels?: string[];
    metadata?: {
      custom_fields: Array<{
        display_name: string;
        variable_name: string;
        value: string;
      }>;
    };
    onSuccess?: (transaction: any) => void;
    onCancel?: () => void;
    onError?: (error: Error) => void;
  }

  class PaystackPop {
    newTransaction(options: PaystackOptions): void;
  }

  export default PaystackPop;
} 