/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'files.edgestore.dev', 
      'public.blob.vercel-storage.com',
      'qhaxwz0jp8ddupfg.public.blob.vercel-storage.com'
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'public.blob.vercel-storage.com',
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
};

module.exports = nextConfig;