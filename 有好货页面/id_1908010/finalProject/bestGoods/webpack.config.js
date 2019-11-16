// import MiniCssExtractPlugin from 'mini-css-extract-plugin'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const pathResolve = targetPath => path.resolve(__dirname, targetPath)



module.exports = {
    entry: {
        app:"./index.js",
    },
    output: {
        path: pathResolve('dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: [['babel-plugin-transform-react-jsx', {pragma:"create"}]]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/, 
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // CSS中最终路径 = publicPath + background: url，设置publicPath确保图片取得到
                        publicPath: '../', 
                    }
                },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:7].[ext]',
                            outputPath: 'img',
                        }
                    }
                ]
            }
        ]
    },
    mode: 'development',
    devServer: {
        contentBase: './dist',
        hot: true,
        host: '192.168.1.135',
        port: 8080,
    },
    optimization: {
        minimize: false
    },
    plugins: [
        /**
         * html-webpack-plugin 的作用是：当使用 webpack打包时，创建一个 html 文件，
         * 并把 webpack 打包后的静态文件自动插入到这个 html 文件当中.
         * 所以打包的css文件被插入到html文件中,使得css可以被找到
         */
        new htmlWebpackPlugin({
            filename: pathResolve('dist/index.html'),
            title: "每日好店",
            meta: {
                viewport: 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
            }

        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        })
    ]
}