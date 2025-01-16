"use client";
import { useEffect, useState, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ImageModal } from "./components/ImageModal";
import Image from "next/image";

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

// Make sure you have actual images in these paths
const galleryImages: GalleryImage[] = [
  {
    src: "/images/unifilm34.JPG",
    alt: "Students Graduation",
    category: "Graduation"
  },
  {
    src: "/images/unifilm35.JPG",
    alt: "Students Graduation",
    category: "Graduation"
  },
  {
    src: "/images/unifilm32.JPG",
    alt: "Students Graduation",
    category: "Graduation"
  },
  {
    src: "/images/unifilm36.JPG",
    alt: "Students Graduation",
    category: "Graduation"
  },
  {
    src: "/images/unifilm30.JPG",
    alt: "Students Graduation",
    category: "Graduation"
  },
  {
    src: "/images/unifilm17.JPG",
    alt: "Students Graduation",
    category: "Graduation"
  },
  {
    src: "/images/unifilm1.jpg",
    alt: "Students Practical learning Session",
    category: "Practical Learning"
  },
  {
    src: "/images/unifilm2.jpg",
    alt: "Students Practical learning Session",
    category: "Practical Learning"
  },
  {
    src: "/images/unifilm4.JPG",
    alt: "Students Practical learning Session",
    category: "Practical Learning"
    
  },
  {
    src: "/images/unifilm5.JPG",
    alt: "Students Practical learning Session",
    category: "Practical Learning"
  },
  {
    src: "/images/unifilm6.JPG",
    alt: "Students Practical learning Session",
    category: "Practical Learning"
  },
  {
    src: "/images/unifilm20.jpg",
    alt: "Students Practical learning Session",
    category: "Practical Learning"
  },
  {
    src: "/images/unifilm22.jpg",
    alt: "Students Practical learning Session",
    category: "Practical Learning"
  },
  {
    src: "/images/unifilm14.jpg",
    alt: "Students Practical learning Session",
    category: "Practical Learning"
  },
  {
    src: "/images/unifilm23.JPG",
    alt: "Graphic Design Works Made by Students",
    category: "Graphic Design"
  },
  {
    src: "/images/unifilm24.JPG",
    alt: "Graphic Design Works Made by Students",
    category: "Graphic Design"
  },
  {
    src: "/images/unifilm25.JPG",
    alt: "Graphic Design Works Made by Students",
    category: "Graphic Design"
  },
  {
    src: "/images/unifilm26.JPG",
    alt: "Graphic Design Works Made by Students",
    category: "Graphic Design"
  },
  {
    src: "/images/unifilm27.JPG",
    alt: "Graphic Design Works Made by Students",
    category: "Graphic Design"
  },
  {
    src: "/images/unifilm28.JPG",
    alt: "Graphic Design Works Made by Students",
    category: "Graphic Design"
  },
  {
    src: "/images/unifilm29.JPG",
    alt: "Graphic Design Works Made by Students",
    category: "Graphic Design"
  },
  {
    src: "/images/unifilm9.JPG",
    alt: "Graphic Design Works Made by Students",
    category: "Graphic Design"
  },
  {
    src: "/images/unifilm18.JPG",
    alt: "Graphic Design Works Made by Students",
    category: "Graphic Design"
  },
  {
    src: "/images/unifilm7.WEBP",
    alt: "Studio Rooms and Equipment",
    category: "Studio Rooms and Equipment"
  },
  {
    src: "/images/unifilm8.JPG",
    alt: "Studio Rooms and Equipment",
    category: "Studio Rooms and Equipment"
  },
  {
    src: "/images/unifilm12.JPG",
    alt: "Studio Rooms and Equipment",
    category: "Studio Rooms and Equipment"
  },
  {
    src: "/images/unifilm37.JPG",
    alt: "Studio Rooms and Equipment",
    category: "Studio Rooms and Equipment"
  },
  {
    src: "/images/unifilm3.JPG",
    alt: "Studio Rooms and Equipment",
    category: "Studio Rooms and Equipment"
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  const handleNext = useCallback(() => {
    const currentIndex = galleryImages.findIndex(img => img.src === selectedImage?.src);
    if (currentIndex < galleryImages.length - 1) {
      setSelectedImage(galleryImages[currentIndex + 1]);
    }
  }, [selectedImage]);

  const handlePrevious = useCallback(() => {
    const currentIndex = galleryImages.findIndex(img => img.src === selectedImage?.src);
    if (currentIndex > 0) {
      setSelectedImage(galleryImages[currentIndex - 1]);
    }
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'Escape') setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handleNext, handlePrevious]);

  return (
    <>
      <div data-aos="fade-up">
        {/* Hero Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Our Gallery</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Explore life at Unifilm College through our collection of images showcasing our vibrant community, state-of-the-art facilities, and student achievements.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="py-24 sm:py-32 bg-muted">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={`${(index + 1) * 100}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-white font-semibold text-sm sm:text-base">{image.category}</p>
                        <p className="text-gray-200 text-xs sm:text-sm mt-2">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ImageModal 
        image={selectedImage}
        images={galleryImages}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </>
  );
}