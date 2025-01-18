import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { put } from "@vercel/blob";

// New way to configure the API route
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true
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