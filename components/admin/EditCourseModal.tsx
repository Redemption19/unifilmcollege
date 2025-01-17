"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, X } from "lucide-react";
import { Course } from "@/types";
import toast from 'react-hot-toast';

interface EditCourseModalProps {
  course: Course;
  onSubmit: (id: string, formData: FormData) => Promise<void>;
}

export default function EditCourseModal({ course, onSubmit }: EditCourseModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Process modules
      const modulesText = formData.get('modules') as string;
      const modules = modulesText.split('\n').filter(module => module.trim() !== '');
      formData.delete('modules');
      modules.forEach(module => formData.append('modules', module));

      // Process learning outcomes
      const outcomesText = formData.get('learningOutcomes') as string;
      const outcomes = outcomesText.split('\n').filter(outcome => outcome.trim() !== '');
      formData.delete('learningOutcomes');
      outcomes.forEach(outcome => formData.append('learningOutcomes', outcome));

      // Log the formData for debugging without using entries()
      console.log('FormData contents:');
      const formDataObj = Object.fromEntries(Array.from(formData));
      console.log(formDataObj);

      await onSubmit(course._id, formData);
      setOpen(false);
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="flex flex-row items-center justify-between sticky top-0 bg-background z-50 pb-4">
          <DialogTitle>Edit Course</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setOpen(false)}
            className="h-6 w-6 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={course.title}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  defaultValue={course.duration}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fees">Fees</Label>
                <Input
                  id="fees"
                  name="fees"
                  defaultValue={course.fees}
                  required
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Course Description</h3>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={course.description}
                required
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Course Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Course Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modules">Modules (one per line)</Label>
                <Textarea
                  id="modules"
                  name="modules"
                  defaultValue={course.modules?.join('\n')}
                  rows={5}
                  className="min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="learningOutcomes">Learning Outcomes (one per line)</Label>
                <Textarea
                  id="learningOutcomes"
                  name="learningOutcomes"
                  defaultValue={course.learningOutcomes?.join('\n')}
                  rows={5}
                  className="min-h-[150px]"
                />
              </div>
            </div>
          </div>

          {/* Career Path Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Career Information</h3>
            <div className="space-y-2">
              <Label htmlFor="careerPath">Career Path</Label>
              <Textarea
                id="careerPath"
                name="careerPath"
                defaultValue={course.careerPath}
                rows={3}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving Changes...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 