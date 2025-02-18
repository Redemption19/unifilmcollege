import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { put } from "@vercel/blob";
import sharp from "sharp";

// Increase payload size limit within the route handler itself
export const runtime = "nodejs"; // Ensure this runs in a Node.js environment

export async function GET() {
  try {
    await connectDB();
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    console.error("[GALLERY_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const alt = formData.get("alt") as string;
    const category = formData.get("category") as string;

    if (!file || !alt || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Optimize image before upload
    const buffer = Buffer.from(await file.arrayBuffer());
    const optimizedBuffer = await sharp(buffer)
      .resize(1200, 900, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80 }) // Compress JPEG
      .toBuffer();

    // Upload optimized image
    const blob = await put(file.name, optimizedBuffer, {
      access: "public",
      addRandomSuffix: true,
      contentType: "image/jpeg",
    });

    // Create database entry
    const image = await GalleryImage.create({
      src: blob.url,
      alt,
      category,
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error("[GALLERY_POST]", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    await connectDB();
    const image = await GalleryImage.findByIdAndDelete(id);

    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("[GALLERY_DELETE]", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}