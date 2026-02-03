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
  
  // Webpack configuration for Three.js
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
};

export default nextConfig;
