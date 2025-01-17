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
import { Loader2, Pencil } from "lucide-react";
import { GalleryImage } from "@/types";
import toast from "react-hot-toast";

interface EditGalleryModalProps {
  image: GalleryImage;
  onSubmit: (id: string, formData: FormData) => Promise<void>;
}

export default function EditGalleryModal({ image, onSubmit }: EditGalleryModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      // Log formData contents for debugging
      console.log('Submitting form data:', {
        file: formData.get('file'),
        alt: formData.get('alt'),
        category: formData.get('category')
      });

      await onSubmit(image._id, formData);
      setOpen(false);
      toast.success('Image updated successfully');
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to update image");
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="file">Image</Label>
            <Input 
              id="file" 
              name="file" 
              type="file" 
              accept="image/*"
            />
            <p className="text-sm text-muted-foreground">
              Leave empty to keep the current image
            </p>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="alt">Title</Label>
            <Input
              id="alt"
              name="alt"
              defaultValue={image.alt}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              defaultValue={image.category}
              required
            />
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