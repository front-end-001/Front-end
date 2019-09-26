const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: "development",
  devtool: "source-map",
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  resolve: {
    alias: {
      MyCreate: path.resolve(__dirname, 'MyCreate'),
      '~': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-react-jsx", {pragma: "MyCreate"}]]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
       test: /\.png|jpg$/,
       use: {
         loader: 'file-loader'
       }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {template: "src/index.html"}
    )
  ]
}
