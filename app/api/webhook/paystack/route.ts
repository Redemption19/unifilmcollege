import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Payment from "@/models/payment";
import connectDB from "@/lib/mongodb";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function verifyPaystackSignature(request: Request, body: string) {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex');
  
  return hash === request.headers.get('x-paystack-signature');
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    
    // Verify webhook signature
    if (!verifyPaystackSignature(request, body)) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // Handle successful payments
    if (event.event === 'charge.success') {
      const { reference, metadata, amount, customer } = event.data;
      
      await connectDB();

      // Save payment to database
      const payment = await Payment.create({
        email: customer.email,
        fullName: metadata.custom_fields[0].value,
        phone: metadata.custom_fields[1].value,
        amount: amount / 100,
        reference,
        status: 'successful',
      });

      // Send form download email
      await resend.emails.send({
        from: 'Unifilm College <admissions@unifilmcollege.com>',
        to: customer.email,
        subject: 'Your Unifilm College Admission Form',
        html: `
          <h1>Thank you for purchasing the admission form</h1>
          <p>Dear ${metadata.custom_fields[0].value},</p>
          <p>Thank you for purchasing the Unifilm College admission form. Please click the link below to download your form:</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/forms/admission-form.pdf">Download Admission Form</a></p>
          <p>If you have any questions, please contact us at support@unifilmcollege.com</p>
        `,
      });

      // Send admin notification
      await resend.emails.send({
        from: 'Unifilm College <notifications@unifilmcollege.com>',
        to: 'admin@unifilmcollege.com',
        subject: 'New Admission Form Purchase',
        html: `
          <h1>New Form Purchase</h1>
          <p>A new admission form has been purchased:</p>
          <ul>
            <li>Name: ${metadata.custom_fields[0].value}</li>
            <li>Email: ${customer.email}</li>
            <li>Phone: ${metadata.custom_fields[1].value}</li>
            <li>Amount: GHS ${amount / 100}</li>
            <li>Reference: ${reference}</li>
          </ul>
        `,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Updated API Route Segment Config
export const dynamic = 'force-dynamic'; // Ensures the route is dynamic