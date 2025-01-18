/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'res.cloudinary.com',
      'qhaxwz0jp8ddupfg.public.blob.vercel-storage.com'  // Added Vercel Blob Storage
    ],
  },
}

module.exports = nextConfig 