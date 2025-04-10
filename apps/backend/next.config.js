// // @ts-check
// const path = require('path');
// const { composePlugins, withNx } = require('@nx/next');

// /**
//  * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
//  **/
// const nextConfig = {
//   nx: {
//     svgr: false,
//   },
//   // Required for Vercel deployment
//   output: 'standalone',
//   webpack: (config, { isServer }) => {
//     // Add @backend-utils alias
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       '@backend-utils': path.resolve(__dirname, '../../libs/backend-utils'),
//     };
//     return config;
//   },

//   rewrites: async () => [
//     {
//       source: '/api/:path*',
//       destination: '/api/:path*', // Proxy to Next.js API routes
//     },
//   ],
// };

// const plugins = [withNx];
// module.exports = composePlugins(...plugins)(nextConfig);

// const path = require('path');

// const nextConfig = {
//   output: 'standalone',
//   // webpack: (config) => {
//   //   config.resolve.alias = {
//   //     ...config.resolve.alias,
//   //     '@backend-utils': path.resolve(__dirname, '../../libs/backend-utils'),
//   //   };
//   //   return config;
//   // },
// };

// module.exports = nextConfig;

const { withNx } = require('@nx/next');

const nextConfig = {
  nx: {
    svgr: false,
  },
  output: process.env.VERCEL ? 'standalone' : undefined,
  // If you need to deploy as static export
  // output: 'export',
};

module.exports = withNx(nextConfig);
