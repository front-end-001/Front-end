const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
// const StyleLintPlugin = require("stylelint-webpack-plugin");

const makePlugins = (env, config) => {
  /**
   * 初始化plugins
   */
  const plugins = [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    // new StyleLintPlugin({
    //   files: ["src/**/*.{vue,css,scss,sass}"],
    // }),
  ];
  if (env && env.production) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name]-[contenthash:8].css",
        chunkFilename: "[name].chunk.css", // 非直接被页面引用使用chunkFilename
      }),
    );
  }

  /**
   * 根据config中的entry配置多个HtmlWebpackPlugin做多页面打包处理
   */
  Object.keys(config.entry).forEach((chunkName) => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../public/index.html"),
        filename: `${chunkName}.html`,
        chunks: [chunkName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
        },
      }),
    );
  });
  /**
   * 根据dll目录下的文件名字通过正则添加AddAssetHtmlPlugin或者DllReferencePlugin进行多个 dll的导入
   */
  const files = fs.readdirSync(path.resolve(__dirname, "../dll"));
  files.forEach((file) => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(
        new AddAssetHtmlPlugin({
          filepath: path.resolve(__dirname, "../dll", file),
        }),
      );
    }
    if (/.*manifest.json/.test(file)) {
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, "../dll", file),
        }),
      );
    }
  });
  return plugins;
};
const makeConfig = (env) => ({
  entry: {
    index: path.resolve(__dirname, "../src/index.js"),
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          env && env.production ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 3,
            },
          },
          "postcss-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            options: {
              worker: 3,
            },
          },
          "babel-loader?cacheDirectory=true",
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "images/[name]-[hash].[ext]",
              limit: 8192,
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "media/[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8092,
            name: "font/[hash:8].[ext]",
          },
        },
      },
    ],
  },
  /**
   * TODO: 开启 usedExports 就需要设置 sideEffects 来使 import "style.scss"不被 tree shaking。
   * 但是, 设置 sideEffects 之后 .vue文件的css不会被打包出来
   */
  // optimization: {
  //   usedExports: true
  // }
});

module.exports = (env) => {
  const config = makeConfig(env);
  config.plugins = makePlugins(env, config);
  return config;
};
