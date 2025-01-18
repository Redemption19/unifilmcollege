"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
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
  const [moduleInputs, setModuleInputs] = useState<string[]>(
    course.modules || []
  );
  const [outcomeInputs, setOutcomeInputs] = useState<string[]>(
    course.learningOutcomes || []
  );

  const addModuleInput = () => {
    setModuleInputs([...moduleInputs, '']);
  };

  const removeModuleInput = (index: number) => {
    const newModules = moduleInputs.filter((_, i) => i !== index);
    setModuleInputs(newModules);
  };

  const updateModuleInput = (index: number, value: string) => {
    const newModules = [...moduleInputs];
    newModules[index] = value;
    setModuleInputs(newModules);
  };

  const addOutcomeInput = () => {
    setOutcomeInputs([...outcomeInputs, '']);
  };

  const removeOutcomeInput = (index: number) => {
    const newOutcomes = outcomeInputs.filter((_, i) => i !== index);
    setOutcomeInputs(newOutcomes);
  };

  const updateOutcomeInput = (index: number, value: string) => {
    const newOutcomes = [...outcomeInputs];
    newOutcomes[index] = value;
    setOutcomeInputs(newOutcomes);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      // Add modules and learning outcomes as arrays
      formData.delete('modules');
      formData.delete('learningOutcomes');
      moduleInputs.forEach((module) => {
        if (module.trim()) formData.append('modules', module);
      });
      outcomeInputs.forEach((outcome) => {
        if (outcome.trim()) formData.append('learningOutcomes', outcome);
      });

      await onSubmit(course._id, formData);
      setOpen(false);
      toast.success('Course updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update course');
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
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
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={course.description}
                required
              />
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

          {/* Modules Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Modules</h3>
            <div className="space-y-2">
              {moduleInputs.map((module, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={module}
                    onChange={(e) => updateModuleInput(index, e.target.value)}
                    name={`modules`}
                    placeholder="Enter module name"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeModuleInput(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {index === moduleInputs.length - 1 && (
                    <Button type="button" onClick={addModuleInput} variant="outline">
                      +
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Learning Outcomes Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Learning Outcomes</h3>
            <div className="space-y-2">
              {outcomeInputs.map((outcome, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={outcome}
                    onChange={(e) => updateOutcomeInput(index, e.target.value)}
                    name={`learningOutcomes`}
                    placeholder="Enter learning outcome"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeOutcomeInput(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {index === outcomeInputs.length - 1 && (
                    <Button type="button" onClick={addOutcomeInput} variant="outline">
                      +
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Career Path Section */}
          <div className="space-y-2">
            <Label htmlFor="careerPath">Career Path</Label>
            <Textarea
              id="careerPath"
              name="careerPath"
              defaultValue={course.careerPath}
              required
              placeholder="Describe potential career paths"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 