var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader', 
          'css-loader', 
          'less-loader', 
          { loader: 'postcss-loader'},
        ],
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', 'css-loader', { loader: 'postcss-loader'}],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread', 
              "@babel/plugin-syntax-jsx", 
              ["@babel/plugin-transform-react-jsx", {pragma: 'myCreate'}],
            ],
          }
        }
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
  ]
}