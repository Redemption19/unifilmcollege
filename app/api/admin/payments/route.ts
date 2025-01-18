import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Payment from "@/models/payment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const payments = await Payment.find().sort({ createdAt: -1 });
    
    return NextResponse.json(payments);
  } catch (error) {
    console.error("[PAYMENTS_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
} 