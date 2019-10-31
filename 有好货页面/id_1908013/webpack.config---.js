module.exports = {
    entry: "./my.component",
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
                test: /\.component$/,
                use: {
                    loader: require.resolve('./component-loader')
                }
            }
        ]
    },
    devServer: {
        contentBase: './custom-component',
        hot: true,
        host: '0.0.0.0'
    },
    mode: "development",
    optimization: {
        minimize: false
    }
}

