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
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import GalleryModal from "@/components/admin/GalleryModal";
import EditGalleryModal from "@/components/admin/EditGalleryModal";
import { DeleteAlert } from "@/components/DeleteAlert";
import toast from 'react-hot-toast';
import { GalleryImage } from "@/types";

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      if (!res.ok) throw new Error("Failed to fetch gallery");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to fetch gallery images");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string, formData: FormData) => {
    const editPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`/api/admin/gallery/${id}`, {
          method: "PATCH",
          body: formData,
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Failed to update image");
        }

        await fetchGallery();
        resolve("Image updated successfully");
      } catch (error) {
        console.error("Error updating image:", error);
        reject(error);
      }
    });

    toast.promise(editPromise, {
      loading: 'Updating image...',
      success: 'Image updated successfully',
      error: 'Failed to update image'
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
        const res = await fetch(`/api/admin/gallery/${deleteId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Failed to delete image");
        }

        await fetchGallery();
        resolve("Image deleted successfully");
      } catch (error) {
        console.error("Error deleting image:", error);
        reject(error);
      } finally {
        setDeleteLoading(null);
        setDeleteId(null);
      }
    });

    toast.promise(deletePromise, {
      loading: 'Deleting image...',
      success: 'Image deleted successfully',
      error: 'Failed to delete image'
    });
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  const handleAddImage = async (formData: FormData) => {
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add image");
      fetchGallery();
    } catch (error) {
      console.error("Error adding image:", error);
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
        <h1 className="text-3xl font-bold">Gallery</h1>
        <GalleryModal onSubmit={handleAddImage} />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images.map((image) => (
              <TableRow key={image._id}>
                <TableCell>
                  <div className="relative h-16 w-16">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{image.alt}</TableCell>
                <TableCell>{image.category}</TableCell>
                <TableCell className="text-right space-x-2">
                  <EditGalleryModal image={image} onSubmit={handleEdit} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(image._id)}
                    disabled={deleteLoading === image._id}
                  >
                    {deleteLoading === image._id ? (
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
        title="Delete Image"
        description="Are you sure you want to delete this image? This action cannot be undone."
      />
    </div>
  );
} 