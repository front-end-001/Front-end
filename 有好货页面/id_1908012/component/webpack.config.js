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
                      plugins: [['babel-plugin-transform-react-jsx', {pragma:"myCreate"}]]
                    }
                }
            },
            {
                test: /\.component$/,
                use: {
                    loader: require.resolve('./component-loader'),
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
}