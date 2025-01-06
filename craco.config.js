const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@tracks': path.resolve(__dirname, 'src/tracks')
    }
  }
}; 