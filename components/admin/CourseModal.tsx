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
import { Loader2, PlusCircle } from "lucide-react";

export default function CourseModal({ onSubmit }: { onSubmit: (data: FormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moduleInputs, setModuleInputs] = useState(['']); // Start with one empty module input
  const [outcomeInputs, setOutcomeInputs] = useState(['']); // Start with one empty outcome input

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      
      // Handle modules array
      const modules = moduleInputs.filter(module => module.trim() !== '');
      formData.delete('modules'); // Remove individual module inputs
      modules.forEach(module => formData.append('modules', module));

      // Handle learning outcomes array
      const outcomes = outcomeInputs.filter(outcome => outcome.trim() !== '');
      formData.delete('learningOutcomes'); // Remove individual outcome inputs
      outcomes.forEach(outcome => formData.append('learningOutcomes', outcome));

      await onSubmit(formData);
      setOpen(false);
      e.currentTarget.reset();
      setModuleInputs(['']);
      setOutcomeInputs(['']);
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
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input name="title" required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea name="description" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Input name="duration" required placeholder="e.g., 1 year" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fees</label>
              <Input name="fees" required placeholder="e.g., 3500 GHS" />
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
              required 
              placeholder="Describe potential career paths"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image</label>
            <Input name="image" type="file" accept="image/*" required />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Course"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 