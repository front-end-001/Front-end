module.exports =  { 
    devtool: 'source-map',
    entry: "./src/js/script.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: [["@babel/plugin-transform-react-jsx", {pragma: 'myCreate'}],'@babel/plugin-proposal-object-rest-spread']
                    }
                }
            }
        ]
    },
    mode: "development",
    optimization: {
        minimize: false
    },
    devServer:{
        contentBase: './dist',
        hot: true,
        host: '0.0.0.0',
    }
}