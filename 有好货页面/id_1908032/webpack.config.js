const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devServer: {
      contentBase: './dist',
      // hosts: true
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
                    ["@babel/plugin-syntax-jsx"],
                    ["babel-plugin-transform-react-jsx", { pragma: "create" }]
                  ]
              }
              
            }
          }
        ]
      }
  };