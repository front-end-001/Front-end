/*
 * @Author: your name
 * @Date: 2019-10-27 17:17:32
 * @LastEditTime: 2019-10-27 17:17:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Front-end/有好货页面/id_1908028/webpack.config.js
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
              ["babel-plugin-transform-react-jsx", { pragma: "create" }]
            ]
          }
        }
      },
      {
        test: /\.component$/,
        use: {
          loader: require.resolve("./component-loader.js")
        }
      },
      {
        test: /\.css$/i,
        use: [require.resolve("./component-css-loader.js")]
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
