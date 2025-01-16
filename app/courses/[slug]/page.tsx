import Link from "next/link";
import { Button } from "@/components/ui/button";
import { courseData } from "@/lib/course-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return courseData.map((course) => ({
    slug: course.slug,
  }));
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = courseData.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            {course.title}
          </h1>

          <div className="grid gap-8">
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Program Details</h2>
              <dl className="grid gap-4">
                <div>
                  <dt className="font-medium text-muted-foreground">Duration</dt>
                  <dd className="mt-1">{course.duration}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Fees</dt>
                  <dd className="mt-1">{course.fees}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Modules</h2>
              <ul className="list-disc pl-6 space-y-2">
                {course.modules.map((module, index) => (
                  <li key={index}>{module}</li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Learning Outcomes</h2>
              <ul className="list-disc pl-6 space-y-2">
                {course.learningOutcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Career Path</h2>
              <p>{course.careerPath}</p>
            </div>

            <div className="flex justify-center mt-8">
              <Button asChild size="lg">
                <Link href="/admissions">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}