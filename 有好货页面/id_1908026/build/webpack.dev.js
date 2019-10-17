const webpackMerge = require("webpack-merge");
const createBaseConfig = require("./webpack.base.js");

const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "../dist",
    hot: true,
    host: "0.0.0.0",
    // hotOnly: true,
    overlay: true,
    before(app) {
      app.get("/data", (req, res) => {
        res.json([
          {
            a: 1,
            b: 2,
          },
          {
            a: 3,
            b: 4,
          },
          {
            a: 5,
            b: 6,
          },
          {
            a: 7,
            b: 8,
          },
          {
            a: 9,
            b: 10,
          },
        ]);
      });
    },
    proxy: {
      "/test/api": {
        target: "http://www.dell-lee.com",
        secure: false, // 开启支持https
        pathRewrite: {
          "header.json": "demo.json",
        },
        /* eslint-disable */
        // bypass(req, res, proxyOptions) {
        //   if (req.headers.accept.indexOf("html") !== -1) {
        //     console.log("Skipping proxy for brower request");
        //     return fasle;
        //   }
        // }
      }
    }
  }
};

module.exports = env => webpackMerge(createBaseConfig(env), devConfig);
