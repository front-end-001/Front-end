const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["babel-plugin-transform-react-jsx", { pragma: "myCreate" }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
             {
                 loader: 'style-loader'
             },
             {
                 loader: 'css-loader'
             }
        ]
      }
    ]
  },
  mode: "development",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
      filename: "index.html"
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src"),
      '_c': path.resolve(__dirname, "src/components"),
    }
  }
};
