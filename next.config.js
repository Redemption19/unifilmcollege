/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'qhaxwz0jp8ddupfg.public.blob.vercel-storage.com',
      'public.blob.vercel-storage.com'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

module.exports = nextConfig 