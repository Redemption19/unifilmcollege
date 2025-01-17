"use client";
import slugify from "slugify";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { Course } from "@/types";
import CourseModal from "@/components/admin/CourseModal";
import EditCourseModal from "@/components/admin/EditCourseModal";
import { format } from "date-fns";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/admin/courses");
      const data = await res.json();
      if (Array.isArray(data)) {
        // Transform the data to ensure all required fields are present
        const transformedData = data.map(course => ({
          ...course,
          slug: course.slug || slugify(course.title, { lower: true }),
          updatedAt: course.updatedAt || new Date().toISOString()
        }));
        setCourses(transformedData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (formData: FormData) => {
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        fetchCourses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id: string, formData: FormData) => {
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "PATCH",
        body: formData,
      });
      if (res.ok) {
        fetchCourses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchCourses();
      }
    } catch (error) {
      console.error(error);
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        <CourseModal onSubmit={handleAddCourse} />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    {course.title}
                  </div>
                </TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{course.fees}</TableCell>
                <TableCell>
                  {course.createdAt && format(new Date(course.createdAt), "MM/dd/yyyy")}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <EditCourseModal course={course} onSubmit={handleEdit} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCourse(course._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 