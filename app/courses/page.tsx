"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Course } from "@/types";
import { Loader2 } from "lucide-react";

export default function CoursesPage() {
  const [courses, setcourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      if (Array.isArray(data)) {
        setcourses(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="py-24 sm:py-32" data-aos="fade-up" data-aos-delay="200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-card rounded-2xl overflow-hidden shadow-lg flex flex-col"
              >
                <div className="relative h-[240px] w-full">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-8 flex-1">
                  <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
                  <dl className="grid gap-4 mb-6">
                    <div>
                      <dt className="font-medium text-muted-foreground">Duration</dt>
                      <dd className="mt-1">{course.duration}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Fees</dt>
                      <dd className="mt-1">{course.fees}</dd>
                    </div>
                  </dl>
                  <p className="text-muted-foreground mb-8">
                    {course.description}
                  </p>
                  <div className="flex gap-4">
                    <Button asChild>
                      <Link href={`/courses/${course.slug}`}>Read More</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/admissions">Apply Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}