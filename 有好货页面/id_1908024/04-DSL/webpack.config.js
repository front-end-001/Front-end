module.exports = {
    entry: './index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'create' }]],
                    },
                },
            },
            {
                test: /\.component$/,
                use: {
                    loader: require.resolve('./component-loader.js'),
                },
            },
        ],
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    optimization: {
        minimize: false,
    },
}
