"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ImageModal } from "./components/ImageModal";
import Image from "next/image";
import { GalleryImage } from "@/types";
import { shimmer, toBase64 } from "@/lib/image";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      if (!res.ok) throw new Error('Failed to fetch gallery images');
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
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
          {loading ? (
            <div className="text-center">Loading gallery...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <div
                  key={image._id}
                  className="relative group cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={`${(index + 1) * 100}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 6}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
                      loading={index < 6 ? 'eager' : 'lazy'}
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
          )}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
}
