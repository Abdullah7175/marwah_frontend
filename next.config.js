/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  images: {
    domains: ['98.82.201.1', 'mtumrah.com', 'www.mtumrah.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Support for both HTTP and HTTPS
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' && process.env.USE_HTTPS === 'true' 
          ? 'https://www.mtumrah.com/api/:path*' 
          : 'http://98.82.201.1:8000/api/:path*',
      },
    ];
  },
  // Enable HTTPS redirect in production
  async redirects() {
    if (process.env.NODE_ENV === 'production' && process.env.USE_HTTPS === 'true') {
      return [
        {
          source: '/(.*)',
          has: [
            {
              type: 'header',
              key: 'x-forwarded-proto',
              value: 'http',
            },
          ],
          destination: 'https://www.mtumrah.com/:path*',
          permanent: true,
        },
      ];
    }
    return [];
  },
}

module.exports = nextConfig

