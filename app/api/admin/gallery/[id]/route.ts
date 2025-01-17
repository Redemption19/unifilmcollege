import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { put } from "@vercel/blob";

interface UpdateData {
  alt: string;
  category: string;
  src?: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const alt = formData.get("alt") as string;
    const category = formData.get("category") as string;

    if (!alt || !category) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 }
      );
    }

    const updateData: UpdateData = {
      alt,
      category,
    };

    if (file instanceof File && file.size > 0) {
      const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true
      });
      updateData.src = blob.url;
    }

    const image = await GalleryImage.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update image" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const image = await GalleryImage.findByIdAndDelete(params.id);
    
    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
} 