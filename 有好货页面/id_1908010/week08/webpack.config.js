module.exports = {
    entry: "./test.js",
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
            }
        ]
    },
    mode: "development",
    devServer: {
        contentBase: "./dist",
        hot: trueew
    },
    optimization: {
        minimize: false
    }
}