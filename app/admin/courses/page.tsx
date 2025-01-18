"use client";

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
import { Loader2, PlusCircle, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/types";
import CourseModal from "@/components/admin/CourseModal";
import EditCourseModal from "@/components/admin/EditCourseModal";
import toast from 'react-hot-toast';
import { DeleteAlert } from "@/components/DeleteAlert";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/admin/courses");
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (formData: FormData) => {
    const addPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch("/api/admin/courses", {
          method: "POST",
          body: formData,
        });
        
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Failed to add course");
        }
        
        await fetchCourses();
        resolve("Course added successfully");
      } catch (error) {
        console.error("Error adding course:", error);
        reject(error);
      }
    });

    toast.promise(addPromise, {
      loading: 'Adding course...',
      success: 'Course added successfully',
      error: 'Failed to add course'
    });
  };

  const handleEdit = async (id: string, formData: FormData) => {
    const editPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`/api/admin/courses/${id}`, {
          method: "PATCH",
          body: formData,
        });
        
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Failed to update course");
        }
        
        await fetchCourses();
        resolve("Course updated successfully");
      } catch (error) {
        console.error("Error updating course:", error);
        reject(error);
      }
    });

    toast.promise(editPromise, {
      loading: 'Updating course...',
      success: 'Course updated successfully',
      error: 'Failed to update course'
    });
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    setDeleteLoading(deleteId);
    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`/api/admin/courses/${deleteId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Failed to delete course");
        }

        await fetchCourses();
        resolve("Course deleted successfully");
      } catch (error) {
        console.error("Error deleting course:", error);
        reject(error);
      } finally {
        setDeleteLoading(null);
        setDeleteId(null);
      }
    });

    toast.promise(deletePromise, {
      loading: 'Deleting course...',
      success: 'Course deleted successfully',
      error: 'Failed to delete course'
    });
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button asChild>
          <Link href="/admin/courses/add">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Course
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Duration</TableHead>
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
                <TableCell className="text-right space-x-2">
                  <EditCourseModal course={course} onSubmit={handleEdit} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(course._id)}
                    disabled={deleteLoading === course._id}
                  >
                    {deleteLoading === course._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteAlert
        isOpen={!!deleteId}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Course"
        description="Are you sure you want to delete this course? This action cannot be undone."
      />
    </div>
  );
} 