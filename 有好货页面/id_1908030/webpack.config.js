
module.exports = {
    entry: "./src/main.js",
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
                    loader: require.resolve('./src/component-loader.js')
                }
            },
            {
                test: /\.css$/i,
                use: [require.resolve('./src/component-css-loader.js')],
            },
        ]
    },
    mode: "development",
    devServer: {
        contentBase: "./dist",
        hot: true,
        // host: "10.1.71.26",
        port: 8082
    },
    optimization: {
        minimize: false
    }
}