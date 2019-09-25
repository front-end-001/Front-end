module.exports = {
  entry: './src/index.js',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/plugin-syntax-jsx",
              ["@babel/plugin-transform-react-jsx", { "pragma": "myCreate" }],
              '@babel/plugin-proposal-object-rest-spread'
            ]
          }
        }
      },
      {
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            'less-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    host:'0.0.0.0',
    hot: true
  },
  optimization: {
    minimize: false
  }
}