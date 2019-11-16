module.exports = {
    entry: "./script.js",
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'bundle.js'
    // },
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
                use: [require.resolve('./component-css-loader.js')],
            },
        ]
    },
    mode: "development",
    devServer: {
        contentBase: './dist',
        // host: '0.0.0.0',
        // port: 9000,
        hot: true
    },
    optimization: {
        minimize: false
    }
}