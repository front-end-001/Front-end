const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
    entry: "./shop/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['babel-plugin-transform-react-jsx', {pragma:"myCreate"}]]
                    }
                }
            },
            {
                test: /\.component$/,
                use: {
                    loader: require.resolve('./component-loader.js')
                }
            },
            {
                test: /\.css$/,
                use: {
                    loader: require.resolve('./component-css-loader.js')
                }
                /*[ 'to-string-loader', 'css-loader'/!*, {
                    loader: require.resolve('./component-css-loader.js')
                }*!/]*/
            }/*,
            {
                test: /\.(jpe?g|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: "./dist/img/[name].[ext]"
                    }
                }
            }*/
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: './shop/static/', to: 'static/', force: true },
            { from: './dist/index.html', to: 'index.html', force: true },
        ]),
    ],
    mode: "development",
    devServer: {
        contentBase: './dist',
        hot: true
    },
    optimization: {
        minimize: false
    }
}
