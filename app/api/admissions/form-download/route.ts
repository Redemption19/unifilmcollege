import { NextResponse } from 'next/server';
import { resend, emailConfig } from '@/lib/resend';
import Payment from '@/models/Payment';
import connectDB from '@/lib/mongodb';
import path from 'path';
import fs from 'fs/promises';
import { FormPurchaseEmail } from '@/emails/form-purchase-success';
import { render } from '@react-email/render';

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();

    // Connect to database
    await connectDB();

    // Find payment
    const payment = await Payment.findOne({ reference });
    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Get form file
    const formPath = path.join(process.cwd(), 'public', 'forms', 'admission-form.pdf');
    const formBuffer = await fs.readFile(formPath);

    // Send email with form if not sent already
    if (!payment.formSent) {
      // Generate secure download link (valid for 24 hours)
      const downloadLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/admissions/download/${reference}`;

      // Send email using React Email template
      await resend.emails.send({
        from: emailConfig.from,
        to: payment.email,
        replyTo: emailConfig.replyTo,
        subject: 'Welcome to Unifilm College - Your Admission Form',
        react: FormPurchaseEmail({
          customerName: payment.fullName,
          downloadLink,
          reference: payment.reference,
          amount: payment.amount
        }),
        attachments: [
          {
            filename: 'unifilm-admission-form.pdf',
            content: formBuffer
          }
        ]
      });

      // Update payment to mark form as sent
      payment.formSent = true;
      await payment.save();
    }

    // Return form for direct download
    return new NextResponse(formBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=unifilm-admission-form.pdf'
      }
    });

  } catch (error) {
    console.error('Form download error:', error);
    return NextResponse.json(
      { error: 'Failed to process form download' },
      { status: 500 }
    );
  }
} 