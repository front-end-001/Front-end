const path = require('path');

module.exports = {
  entry: './src/css-animation-lib/entry/entry.ts',
  // entry: './src/css-animation-lib/entry/carousel-entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'timeline.bundle.js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }]
  }
};
