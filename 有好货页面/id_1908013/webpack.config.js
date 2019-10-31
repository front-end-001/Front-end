module.exports = {
    entry: "./index.js",
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
                test: /\.css$/i,
                use: [require.resolve('./component-css-loader.js')]
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        host: '0.0.0.0'
    },
    mode: "development",
    optimization: {
        minimize: false
    }
}

