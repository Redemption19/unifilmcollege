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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle } from "lucide-react";

export default function CourseModal({ onSubmit }: { onSubmit: (data: FormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moduleInputs, setModuleInputs] = useState(['']);
  const [outcomeInputs, setOutcomeInputs] = useState(['']);

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
          <DialogTitle>Add New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium sticky top-16 bg-background z-10 py-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input 
                  id="image" 
                  name="image" 
                  type="file" 
                  accept="image/*" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input 
                  id="duration" 
                  name="duration" 
                  required 
                  placeholder="e.g., 1 year" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fees">Fees</Label>
                <Input 
                  id="fees" 
                  name="fees" 
                  required 
                  placeholder="e.g., 3500 GHS" 
                />
              </div>
            </div>
          </div>

          {/* Modules Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium sticky top-16 bg-background z-10 py-2">Modules</h3>
            <div className="space-y-2">
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
          </div>

          {/* Learning Outcomes Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium sticky top-16 bg-background z-10 py-2">Learning Outcomes</h3>
            <div className="space-y-2">
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
          </div>

          {/* Career Path Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium sticky top-16 bg-background z-10 py-2">Career Path</h3>
            <Textarea 
              id="careerPath"
              name="careerPath" 
              required 
              placeholder="Describe potential career paths"
            />
          </div>

          <DialogFooter className="sticky bottom-0 bg-background pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Course...
                </>
              ) : (
                'Add Course'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 