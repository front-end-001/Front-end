/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 20:20:07
 * @LastEditTime: 2019-09-15 20:20:07
 * @LastEditors: Please set LastEditors
 */
module.exports = {
  entry: "./script.js",
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
  }
};
