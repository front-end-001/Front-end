module.exports = {
  entry: "./index.js",
  mode: "development",
  module: {
    rules: [{
      test: /\.js/,
      exclude: /(node_modules)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [["@babel/plugin-transform-react-jsx", { pragma: 'h' }]]
          }
        }
      ]
    }]
  },
  devServer: {
    hot: true,
    contentBase: './dist',
    host: '0.0.0.0'
  },
  optimization: {
    minimize: false
  }
}