// @ts-check
const path = require('path');
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  // Required for Vercel deployment
  output: 'standalone', // or 'export' if static (no API routes)
  // Optional: Set basePath if hosted under a subpath (e.g., /api)
  // basePath: '/api',
  webpack: (config, { isServer }) => {
    // Add @backend-utils alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@backend-utils': path.resolve(__dirname, '../../libs/backend-utils'),
    };
    return config;
  },
  // Fix for API routes in Vercel (if using dynamic routes)
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: '/api/:path*', // Proxy to Next.js API routes
    },
  ],
};

const plugins = [withNx];
module.exports = composePlugins(...plugins)(nextConfig);
