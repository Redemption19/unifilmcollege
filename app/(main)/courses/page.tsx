"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { Course } from "@/types";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-hot-toast";

// Pre-import CourseGrid instead of using dynamic import
import CourseGrid from '@/components/CourseGrid';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize AOS only once
    const initAOS = () => {
      AOS.init({
        duration: 800,
        once: true,
        disable: 'mobile' // Disable on mobile to prevent re-animation
      });
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        console.log('Fetched courses:', data);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }
        
        setCourses(data);
        setLoading(false);
        // Initialize AOS after data is loaded
        setTimeout(initAOS, 100);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch courses');
        toast.error('Failed to load courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array to run only once

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center flex-col gap-4">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
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
      {courses.length > 0 ? (
        <div data-aos="fade-up">
          <CourseGrid courses={courses} />
        </div>
      ) : (
        <div className="flex h-[40vh] items-center justify-center">
          <p>No courses available</p>
        </div>
      )}
    </div>
  );
}