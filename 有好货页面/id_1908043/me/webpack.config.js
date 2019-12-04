module.exports = {
    entry: "./index.js",
    // entry: "./my.component",
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
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                  },
                ],
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
        contentBase: './dist',
        host: '0.0.0.0',
        hot: true
    },
    optimization: {
        minimize: false
    }
};
