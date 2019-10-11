/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 18:02:02
 * @LastEditTime: 2019-09-07 19:40:09
 * @LastEditors: Please set LastEditors
 */
const path = require("path");

module.exports = {
  entry: "./src/lib.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "development",
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-react-jsx", { pragma: "myCreate" }]
            ]
          }
        }
      }
    ]
  }
};
