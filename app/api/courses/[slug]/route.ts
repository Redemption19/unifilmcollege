import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Course from "@/models/course";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    console.log("Looking for course with slug:", params.slug); // Debug log
    
    const course = await Course.findOne({ slug: params.slug });
    
    if (!course) {
      console.log("Course not found"); // Debug log
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    console.log("Found course:", course); // Debug log
    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
} 