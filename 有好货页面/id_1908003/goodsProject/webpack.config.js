var path = require('path');
var CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  // entry: './my.component',
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
        use: [require.resolve('./component-css-loader.js')],
        // use: ['to-string-loader', 'css-loader'],
        // use: ['style-loader', 'css-loader'],
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
      // {
      //   test: /\.component$/,
      //   use: {
      //     loader: require.resolve('./component-loader.js'),
      //   },
      // }
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
