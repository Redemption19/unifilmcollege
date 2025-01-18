"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { Course } from "@/types";
import AOS from "aos";
import "aos/dist/aos.css";

// Lazy load CourseGrid
const CourseGrid = dynamic(() => import('@/components/CourseGrid'), {
  loading: () => (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
});

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
    });

    // Fetch courses
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div data-aos="fade-up">
      {/* Hero Section */}
      <div className="bg-muted py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Our Programs</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Each program at Unifilm College is designed to equip students with practical skills and knowledge, preparing them for a range of career paths in the film, media, and technology sectors.
            </p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <Suspense 
        fallback={
          <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <CourseGrid courses={courses} />
      </Suspense>
    </div>
  );
}