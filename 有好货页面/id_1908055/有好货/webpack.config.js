module.exports = {
  entry: "./index.js",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['babel-plugin-transform-react-jsx', { pragma: "myCreate" }]]
          }
        }
      }
    ]
  },
  mode: "development",
  optimization: {
    minimize: false
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
