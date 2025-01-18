/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['files.edgestore.dev', 'public.blob.vercel-storage.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig