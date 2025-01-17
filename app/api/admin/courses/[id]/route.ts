import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";
import { put } from "@vercel/blob";
import slugify from "slugify";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const formData = await req.formData();
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const duration = formData.get("duration") as string;
    const fees = formData.get("fees") as string;
    const image = formData.get("image") as File | null;
    const careerPath = formData.get("careerPath") as string;
    
    // Handle modules array
    const modules = formData.getAll("modules").map(m => m.toString()).filter(m => m.trim() !== '');
    
    // Handle learning outcomes array
    const learningOutcomes = formData.getAll("learningOutcomes").map(o => o.toString()).filter(o => o.trim() !== '');

    const updateData: any = {
      title,
      description,
      duration,
      fees,
      slug: slugify(title, { lower: true }),
      modules,
      learningOutcomes,
      careerPath,
    };

    // Only update image if a new one is provided
    if (image && image.size > 0) {
      const blob = await put(image.name, image, {
        access: 'public',
        addRandomSuffix: true
      });
      updateData.image = blob.url;
    }

    const course = await Course.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_UPDATE]", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
} 