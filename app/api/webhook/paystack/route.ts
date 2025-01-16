import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex');

    if (hash !== req.headers.get('x-paystack-signature')) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    // Handle the event
    switch (event.event) {
      case 'charge.success':
        const { reference, customer, metadata } = event.data;
        
        // Store payment info in your database
        await savePaymentToDatabase({
          reference,
          email: customer.email,
          fullName: metadata.custom_fields.find((f: any) => f.variable_name === 'full_name')?.value,
          phone: metadata.custom_fields.find((f: any) => f.variable_name === 'phone')?.value,
          amount: event.data.amount / 100, // Convert from pesewas to cedis
          paidAt: new Date(),
        });

        // Send email to customer with form download link
        await sendFormDownloadEmail(customer.email);

        // Send notification to admin
        await sendAdminNotification({
          type: 'new_form_purchase',
          customerEmail: customer.email,
          amount: event.data.amount / 100,
        });

        break;
      // Handle other events if needed
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}

// Helper functions (implement these based on your needs)
async function savePaymentToDatabase(paymentData: any) {
  // Save to your database (MongoDB, PostgreSQL, etc.)
}

async function sendFormDownloadEmail(email: string) {
  // Send email using your email service (SendGrid, AWS SES, etc.)
}

async function sendAdminNotification(data: any) {
  // Send notification to admin (email, SMS, etc.)
} 