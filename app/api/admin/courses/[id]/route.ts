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
    console.log("Received form data:", Object.fromEntries(formData.entries()));
    
    // Get all form fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const duration = formData.get("duration") as string;
    const fees = formData.get("fees") as string;
    const image = formData.get("image") as File | null;
    const careerPath = formData.get("careerPath") as string;
    
    // Handle arrays
    const modules = formData.getAll("modules").map(m => m.toString());
    const learningOutcomes = formData.getAll("learningOutcomes").map(o => o.toString());

    // Prepare update object
    const updateData: any = {
      title,
      description,
      duration,
      fees,
      modules,
      learningOutcomes,
      careerPath,
      slug: slugify(title, { lower: true })
    };

    // Only include image if a new one is provided
    if (image instanceof File && image.size > 0) {
      const blob = await put(image.name, image, {
        access: 'public',
        addRandomSuffix: true
      });
      updateData.image = blob.url;
    }

    console.log("Update data:", updateData);

    const course = await Course.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!course) {
      console.log("Course not found with ID:", params.id);
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_UPDATE]", error);
    return NextResponse.json(
      { error: "Failed to update course: " + (error as Error).message },
      { status: 500 }
    );
  }
} 