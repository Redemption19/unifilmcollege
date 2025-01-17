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
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil } from "lucide-react";
import { Course } from "@/types";

interface EditCourseModalProps {
  course: Course;
  onSubmit: (id: string, data: FormData) => Promise<void>;
}

export default function EditCourseModal({ course, onSubmit }: EditCourseModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moduleInputs, setModuleInputs] = useState(course.modules || ['']);
  const [outcomeInputs, setOutcomeInputs] = useState(course.learningOutcomes || ['']);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      
      // Handle modules array
      formData.delete('modules');
      moduleInputs.filter(module => module.trim() !== '').forEach(module => {
        formData.append('modules', module);
      });

      // Handle learning outcomes array
      formData.delete('learningOutcomes');
      outcomeInputs.filter(outcome => outcome.trim() !== '').forEach(outcome => {
        formData.append('learningOutcomes', outcome);
      });

      await onSubmit(course._id, formData);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addModuleInput = () => {
    setModuleInputs([...moduleInputs, '']);
  };

  const addOutcomeInput = () => {
    setOutcomeInputs([...outcomeInputs, '']);
  };

  const updateModuleInput = (index: number, value: string) => {
    const newModules = [...moduleInputs];
    newModules[index] = value;
    setModuleInputs(newModules);
  };

  const updateOutcomeInput = (index: number, value: string) => {
    const newOutcomes = [...outcomeInputs];
    newOutcomes[index] = value;
    setOutcomeInputs(newOutcomes);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input name="title" defaultValue={course.title} required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea name="description" defaultValue={course.description} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Input name="duration" defaultValue={course.duration} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fees</label>
              <Input name="fees" defaultValue={course.fees} required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Modules</label>
            {moduleInputs.map((module, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={module}
                  onChange={(e) => updateModuleInput(index, e.target.value)}
                  name={`modules`}
                  placeholder="Enter module name"
                />
                {index === moduleInputs.length - 1 && (
                  <Button type="button" onClick={addModuleInput} variant="outline">
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Learning Outcomes</label>
            {outcomeInputs.map((outcome, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={outcome}
                  onChange={(e) => updateOutcomeInput(index, e.target.value)}
                  name={`learningOutcomes`}
                  placeholder="Enter learning outcome"
                />
                {index === outcomeInputs.length - 1 && (
                  <Button type="button" onClick={addOutcomeInput} variant="outline">
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Career Path</label>
            <Textarea 
              name="careerPath" 
              defaultValue={course.careerPath}
              required 
              placeholder="Describe potential career paths"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image</label>
            <Input name="image" type="file" accept="image/*" />
            <p className="text-sm text-muted-foreground">Leave empty to keep current image</p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 