/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'res.cloudinary.com',
      'qhaxwz0jp8ddupfg.public.blob.vercel-storage.com', // Added Vercel Blob Storage
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  },
}

module.exports = nextConfig;