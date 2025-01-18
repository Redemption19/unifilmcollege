import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Course from "@/models/course";

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find().sort({ createdAt: -1 });
    
    return NextResponse.json(courses, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error("[COURSES_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" }, 
      { status: 500 }
    );
  }
} 