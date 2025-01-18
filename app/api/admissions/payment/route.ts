import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reference, email, fullName, phone, amount, status } = body;

    await connectDB();

    // Save to MongoDB using your existing model
    const payment = await Payment.create({
      reference,
      email,
      fullName,
      phone,
      amount,
      status,
    });

    return NextResponse.json({ success: true, payment });
  } catch (error) {
    console.error('Payment save error:', error);
    return NextResponse.json(
      { error: 'Failed to save payment' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const payments = await Payment.find().sort({ createdAt: -1 });
    return NextResponse.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
} 