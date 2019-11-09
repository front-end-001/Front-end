const path = require('path')
module.exports = {
    entry: "./js/index.js",
    mode: "development",
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['babel-plugin-transform-react-jsx', { pragma: "myCreate" }]]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['to-string-loader','css-loader']
            }
        ]
    },
    devServer: {
        hot: true,//启用热更新
        port: 8000,
        open: true,
        contentBase: path.resolve(__dirname, 'dist'),
        overlay: {
            // 如果打包过程中出现错误在浏览器中渲染一层overlay进行展示
            errors: true
        },
        index: 'index.html'
    },
    watch: true,//实时打包 
    watchOptions: {//监控选项
        poll: 1000,//每秒问我1000次
        aggregateTimeout: 500,//防抖，500ms内所做的任何其他更改聚合到一个重建中。
        ignored: /node_modules/
    },
}
