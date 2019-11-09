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
              ["@babel/plugin-transform-react-jsx", { "pragma": "create" }]
            ]
          }
        }
      },
      {
        test: /\.component$/,
        use: {
          loader: require.resolve('./src/component-loader.js'),
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: require.resolve('./src/component-css-loader.js')
        }]
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
    hot: true
  },
  optimization: {
    minimize: false
  }
}