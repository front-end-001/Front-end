const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "none",
  entry: {
    mao: path.resolve(__dirname, "../src/entrys/lib/index.js"),
    "mao.min": path.resolve(__dirname, "../src/entrys/lib/index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../library"),
    library: "mao",
    libraryTarget: "umd",
    libraryExport: "default",
  },
  externals: ["lodash"], // 打包忽略依赖库
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
