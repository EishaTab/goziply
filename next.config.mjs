import path from 'path';

const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'app'), // Adjust 'app' to your project directory
    };
    return config;
  },
};

export default nextConfig;
