import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { put } from "@vercel/blob";

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

    const updateData: any = {
      alt,
      category,
    };

    // Only update image if new file is provided
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
      { new: true, runValidators: true }
    );

    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(image);
  } catch (error) {
    console.error("[GALLERY_UPDATE]", error);
    return NextResponse.json(
      { error: "Failed to update image" },
      { status: 500 }
    );
  }
} 