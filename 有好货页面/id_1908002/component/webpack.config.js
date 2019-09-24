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
                      plugins: [['babel-plugin-transform-react-jsx', {pragma:"myCreate"}]]
                    }
                }
            }
        ]
    },
    mode: "development",
    devServer: {
        contentBase: './dist',
        hot: true
    },
    optimization: {
        minimize: false
    }
}