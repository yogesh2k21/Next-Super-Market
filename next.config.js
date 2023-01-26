/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'img.icons8.com', 'backend', '127.0.0.1'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    backend: 'http://backend:8000',
  },
}

module.exports = nextConfig