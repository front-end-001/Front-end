module.exports = {
    entry: "./src/index.js",
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
                    loader: require.resolve('./component-loader.js')
                }
            },
            {
                test: /\.css$/i,
                use: [require.resolve('./component-css-loader.js')],
            }
        ]
    },
    mode: "development",
    optimization: {
        minimize: false
    },
    devServer: {
        contentBase: './dist',
        hot: true
    }
};
