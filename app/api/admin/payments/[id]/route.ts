import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Payment from "@/models/payment";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const payment = await Payment.findByIdAndDelete(params.id);
    
    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("[PAYMENT_DELETE]", error);
    return NextResponse.json(
      { error: "Failed to delete payment" },
      { status: 500 }
    );
  }
} 