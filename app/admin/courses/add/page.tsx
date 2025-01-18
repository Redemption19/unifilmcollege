"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [moduleInputs, setModuleInputs] = useState(['']);
  const [outcomeInputs, setOutcomeInputs] = useState(['']);

  const addModuleInput = () => {
    setModuleInputs([...moduleInputs, '']);
  };

  const updateModuleInput = (index: number, value: string) => {
    const newModules = [...moduleInputs];
    newModules[index] = value;
    setModuleInputs(newModules);
  };

  const addOutcomeInput = () => {
    setOutcomeInputs([...outcomeInputs, '']);
  };

  const updateOutcomeInput = (index: number, value: string) => {
    const newOutcomes = [...outcomeInputs];
    newOutcomes[index] = value;
    setOutcomeInputs(newOutcomes);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const addPromise = new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData(e.currentTarget);
        
        // Filter out empty modules and outcomes
        const modules = moduleInputs.filter(module => module.trim() !== '');
        const outcomes = outcomeInputs.filter(outcome => outcome.trim() !== '');

        // Clear existing arrays
        formData.delete('modules');
        formData.delete('learningOutcomes');

        // Add filtered arrays back to formData
        modules.forEach(module => {
          formData.append('modules[]', module);
        });
        
        outcomes.forEach(outcome => {
          formData.append('learningOutcomes[]', outcome);
        });

        const response = await fetch('/api/admin/courses', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to add course');
        }

        resolve('Course added successfully');
        router.push('/admin/courses');
        router.refresh();
      } catch (error: any) {
        console.error(error);
        reject(error.message || 'Failed to add course');
      } finally {
        setLoading(false);
      }
    });

    toast.promise(addPromise, {
      loading: 'Adding course...',
      success: 'Course added successfully',
      error: (err) => `Error: ${err}`
    });
  };

  return (
    <div className="container max-w-4xl py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Add New Course</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
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

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input 
              id="duration" 
              name="duration" 
              required 
              placeholder="e.g., 1 year" 
            />
          </div>
        </div>

        {/* Modules Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Modules</h3>
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
                    Add Module
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Learning Outcomes Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Learning Outcomes</h3>
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
                    Add Outcome
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Career Path Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Career Path</h3>
          <div className="space-y-2">
            <Textarea 
              id="careerPath"
              name="careerPath" 
              required 
              placeholder="Describe potential career paths"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
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
        </div>
      </form>
    </div>
  );
} 