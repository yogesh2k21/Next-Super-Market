/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
module.exports = {
  images: {
    domains: ['localhost','uxwing.com','django-backend','127.0.0.1'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}