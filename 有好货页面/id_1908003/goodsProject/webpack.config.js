var path = require('path');
var CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: './static/', to: 'static/', force: true },
      { from: './index.html', to: 'index.html', force: true },
    ]),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    hot: true
  },
  optimization: {
    minimize: false
  }
};
