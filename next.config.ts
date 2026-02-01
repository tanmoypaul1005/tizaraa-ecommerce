import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable Turbopack (default in Next.js 16)
  turbopack: {},
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize images with new remotePatterns API
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.placeholder.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
