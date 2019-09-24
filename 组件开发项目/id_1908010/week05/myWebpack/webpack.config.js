module.exports = {
    entry: "./index.js",
    mode: "development",
    devServer: {
        contentBase: "./dist",
        hot: true,
        host: '192.168.72.44'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread', 
                            "@babel/plugin-syntax-jsx", 
                            ["@babel/plugin-transform-react-jsx", {pragma: 'myCreate'}],
                        ]
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: false
    }
}


