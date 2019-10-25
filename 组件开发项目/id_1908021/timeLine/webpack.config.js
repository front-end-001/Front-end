const path = require('path');

module.exports = {
  entry: {
    components: './src/entry/component-entry.js',
    timeline: './src/entry/entry.ts',
    'carousel-animation': './src/entry/carousel-entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
      ,
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  }
};
