/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'app'), // 'app' ko apne directory ke hisaab se adjust karein
    };
    return config;
  },
};

export default nextConfig;
