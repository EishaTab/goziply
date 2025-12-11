const path = require('path');  // Import path for CommonJS

module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),  // Adjust 'src' if your app is in a different directory
    };
    return config;
  },
};
