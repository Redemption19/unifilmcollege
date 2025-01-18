"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { GalleryImage } from "@/types";

interface ImageModalProps {
  image: GalleryImage;
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
        <div className="p-6 bg-background">
          <h3 className="text-lg font-semibold mb-2">{image.category}</h3>
          <p className="text-muted-foreground">{image.alt}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 