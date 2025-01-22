/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'files.edgestore.dev', 
      'public.blob.vercel-storage.com',
      'qhaxwz0jp8ddupfg.public.blob.vercel-storage.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    serverActions: true,
  },
  output: 'standalone',
  unstable_runtimeJS: true,
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'sharp'];
    return config;
  }
};

module.exports = nextConfig;