module.exports =  { 
    devtool: 'source-map',
    // entry: "./src/js/script.js",
    entry: "./script.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: [["@babel/plugin-transform-react-jsx", {pragma: 'create'}],'@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.component$/,
                use: {
                    loader: require.resolve('./component-loader.js'),
                    
                }
            },{
                test: /\.css$/i,
                use: [require.resolve('./component-css-loader.js'),],
              },
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