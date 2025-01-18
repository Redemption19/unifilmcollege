import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Course from "@/models/course";
import { put } from "@vercel/blob";
import slugify from "slugify";
import sharp from 'sharp';

export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find().sort({ createdAt: -1 });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("[COURSES_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    
    // Basic fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const duration = formData.get("duration") as string;
    const fees = formData.get("fees") as string;
    const image = formData.get("image") as File;
    const careerPath = formData.get("careerPath") as string;
    
    // Handle arrays
    const modules = formData.getAll("modules").map(m => m.toString()).filter(m => m.trim() !== '');
    const learningOutcomes = formData.getAll("learningOutcomes").map(o => o.toString()).filter(o => o.trim() !== '');

    // Upload image
    const optimizedBuffer = await sharp(await image.arrayBuffer())
      .resize(1200, 800, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    const blob = await put(image.name, optimizedBuffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType: 'image/jpeg'
    });

    const course = await Course.create({
      title,
      description,
      duration,
      fees,
      image: blob.url,
      slug: slugify(title, { lower: true }),
      modules,
      learningOutcomes,
      careerPath
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_POST]", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
} 