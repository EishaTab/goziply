import path from 'path';

const nextConfig = {
  webpack(config) {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);  // Replacing __dirname for ES modules
    
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'app'),  // Adjust 'app' to your project directory
    };
    return config;
  },
};

export default nextConfig;
