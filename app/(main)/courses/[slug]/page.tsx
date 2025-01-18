"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { Course } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CoursePage({ params }: { params: { slug: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("Fetching course with slug:", params.slug); // Debug log
        const res = await fetch(`/api/courses/${params.slug}`);
        if (!res.ok) {
          throw new Error('Course not found');
        }
        const data = await res.json();
        console.log("Fetched course data:", data); // Debug log
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-12">
            {course.title}
          </h1>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Program Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="font-medium text-muted-foreground">Duration</dt>
                    <dd className="mt-1 text-xl">{course.duration}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
              </CardContent>
            </Card>

            {course.modules && course.modules.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {course.modules.map((module, index) => (
                      <li key={index} className="text-muted-foreground">
                        {module}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Learning Outcomes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="text-muted-foreground">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {course.careerPath && (
              <Card>
                <CardHeader>
                  <CardTitle>Career Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.careerPath}
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-center mt-8">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/admissions">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}