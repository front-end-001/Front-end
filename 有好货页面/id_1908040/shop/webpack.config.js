const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = { 
  entry: "./index.js",
  mode: "development",
  devServer: {
    contentBase: "./dist",
    host: '0.0.0.0',
    hot: true
  },
  optimization: {
      minimize: false
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-syntax-jsx',
              ['@babel/plugin-transform-react-jsx', {pragma:"create"}]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {template: "index.html"}
    )
  ]
}
