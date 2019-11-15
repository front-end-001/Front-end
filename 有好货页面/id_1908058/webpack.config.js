const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports =  { 
    devtool: 'source-map',
    entry: "./src/js/script.js",
    // entry: "./script.js",
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
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader:"style-loader" },
                    // MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            // localIdentName: `${isProd ? '[hash:base64:5]' : '[name]-[local]-[hash:base64:1]'}`,
                            modules: true,
                            // camelCase: true,
                            sourceMap: true,
                        }
                    }, 
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer") /*在这里添加*/
                            ]
                        }
                    }, 
                    { loader: "less-loader", 
                        options: {
                            sourceMap: true,
                        } 
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                  }
                ]
            }
            // {
            //     test: /\.component$/,
            //     use: {
            //         loader: require.resolve('./component-loader.js'),
                    
            //     }
            // },{
            //     test: /\.css$/i,
            //     use: [require.resolve('./component-css-loader.js'),],
            //   },
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