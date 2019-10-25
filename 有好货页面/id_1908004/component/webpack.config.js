module.exports = {
    entry: "./script.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
<<<<<<< HEAD
                        presets: ['@babel/preset-env'],
                        plugins: [['babel-plugin-transform-react-jsx', {pragma:"create"}]]
=======
                      presets: ['@babel/preset-env'],
                      plugins: [['babel-plugin-transform-react-jsx', {pragma:"create"}]]
>>>>>>> 76f8f1a5d637205ab4509d9c71d49783b2f895d4
                    }
                }
            },
            {
                test: /\.component$/,
                use: {
                    loader: require.resolve('./component-loader.js')
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