const path = require('path')

module.exports = {
  entry: './app.cmp',
  output: {
    path: path.resolve(__dirname, './dist'),
    // filename: '[name].bundle.js',
    filename: 'main.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.cmp$/,
        use: {
          loader: require.resolve('./my-loader'),
        }
      },
    ],
  },
}