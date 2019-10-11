module.exports = {
    entry: "./index.js",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [["@babel/plugin-transform-react-jsx", {pragma: 'myCreate'}]]
                    }
                }
            }
        ]
    },
    mode: "development",
    devServer: {
        contentBase: './dist',
        host: '0.0.0.0',
        hot: true
    },
    optimization: {
        minimize: false
    }
};
