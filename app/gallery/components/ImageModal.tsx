"use client";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GalleryImage } from "../page";

interface ImageModalProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ImageModal({ image, images, onClose, onNext, onPrevious }: ImageModalProps) {
  if (!image) return null;

  const currentIndex = images.findIndex((img) => img.src === image.src);
  const hasNext = currentIndex < images.length - 1;
  const hasPrevious = currentIndex > 0;

  // Prevent click events from bubbling up
  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  return (
    // Add onClick={onClose} to allow clicking outside to close
    <div 
      className="fixed inset-0 bg-black/80 z-[1001] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Prevent modal content clicks from closing the modal */}
      <div 
        className="relative w-full max-w-5xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute -top-12 right-0 text-white hover:text-gray-300"
          onClick={(e) => handleButtonClick(e, onClose)}
        >
          <X className="h-8 w-8" />
        </Button>
        
        {/* Previous button */}
        {hasPrevious && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70"
            onClick={(e) => handleButtonClick(e, onPrevious)}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {/* Next button */}
        {hasNext && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70"
            onClick={(e) => handleButtonClick(e, onNext)}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}
        
        {/* Image container */}
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
        
        {/* Image details */}
        <div className="mt-4 text-center text-white">
          <p className="text-lg font-semibold">{image.category}</p>
          <p className="text-sm text-gray-300">{image.alt}</p>
          <p className="text-sm text-gray-400 mt-2">
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
} 