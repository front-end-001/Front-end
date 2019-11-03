module.exports = {
    entry: "./script.js",
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
                    loader: require.resolve('./my-component-loader.js')
                }
            }
        ]
    },
    mode: "development",
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        contentBase: './dist',
        hot:true
    },
    optimization: {
        minimize: false
    }
}
