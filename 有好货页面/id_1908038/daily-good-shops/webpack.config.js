const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js', //jsx
    // entry: './src/script.js',//自定义组件component
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ['babel-plugin-transform-react-jsx', {
                                pragma: "create"
                            }]
                        ]
                    }
                }
            },
            // {
            //     test: /\.component$/,
            //     use: {
            //         loader: require.resolve('./src/component-loader.js')
            //     }
            // },
            {
                test: /\.css$/,
                use: {
                    loader: require.resolve('./src/component-css-loader.js')
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: require('sass'),
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new CopyPlugin([{
                from: './static/',
                to: 'static/',
                force: true
            },
            {
                from: './index.html',
                to: 'index.html',
                force: true
            },
        ]),
    ],
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        host: '127.0.0.1',
        hot: true,
        port: '8081'
    },
    optimization: {
        minimize: false
    }
}