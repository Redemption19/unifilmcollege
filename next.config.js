/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  trailingSlash: true,
}

module.exports = nextConfig 