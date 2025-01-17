import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";

export async function DELETE(
  req: Request,
  { params }: { params: { imageId: string } }
) {
  try {
    await connectDB();
    const image = await GalleryImage.findByIdAndDelete(params.imageId);
    
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
} 