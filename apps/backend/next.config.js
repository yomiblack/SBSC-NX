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
  webpack: (config, { isServer }) => {
    // Add @backend-utils alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@backend-utils': path.resolve(__dirname, '../../libs/backend-utils'),
    };

    // Important: Return the modified config
    return config;
  },
};

const plugins = [withNx];
module.exports = composePlugins(...plugins)(nextConfig);
