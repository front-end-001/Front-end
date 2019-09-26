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
                        plugins: [['babel-plugin-transform-react-jsx', {pragma:"myCreate"}]]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    mode: "development",
    optimization: {
        minimize: false
    }
}

