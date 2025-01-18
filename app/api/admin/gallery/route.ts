import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { put } from "@vercel/blob";

// Configure for Vercel serverless functions
export const runtime = 'edge';
export const maxDuration = 60;

export async function GET() {
  try {
    await connectDB();
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const alt = formData.get("alt") as string;
    const category = formData.get("category") as string;

    if (!file || !alt || !category) {
      return NextResponse.json(
        { error: "File, title and category are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Handle file size limit for Vercel
    if (file.size > 4.5 * 1024 * 1024) { // 4.5MB limit
      return NextResponse.json(
        { error: "File size must be less than 4.5MB" },
        { status: 400 }
      );
    }

    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type
    });

    const image = await GalleryImage.create({
      src: blob.url,
      alt,
      category
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error saving gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to save gallery image' },
      { status: 500 }
    );
  }
} 