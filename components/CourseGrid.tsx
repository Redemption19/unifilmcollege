import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types";

interface CourseGridProps {
  courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-card rounded-2xl overflow-hidden shadow-lg flex flex-col"
            >
              <div className="relative aspect-video">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="p-8 flex-1">
                <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
                <dl className="grid gap-4 mb-6">
                  <div>
                    <dt className="font-medium text-muted-foreground">Duration</dt>
                    <dd className="mt-1">{course.duration}</dd>
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
  );
} 