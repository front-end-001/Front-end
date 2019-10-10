const path = require('path')
const pathResolve = targetPath => path.resolve(__dirname, targetPath)
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        path: pathResolve('dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
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
    devServer: {
        contentBase: pathResolve('dist'), //本地服务器所加载文件的目录
        port: '8080', //设置端口号8080
        inline: true, // 文件修改后实时刷新（浏览器刷新）
        historyApiFallback: true, 
        hot: true
    },
    plugins: [
        new htmlWebpackPlugin({
            // filename: pathResolve('dist/index.html'),
            template: pathResolve('src/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            // contenthash 根据css文件内容生成hash值
            filename: 'css/[name].[contenthash:7].css', 
        }),
    ]
}
