const path = require('path');
module.exports = {
    // entry: './src/index.js',
    entry: './src/my.component',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['babel-plugin-transform-react-jsx', {pragma:"create"}]]
                    }
                }
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
        host: '127.0.0.1',
        hot: true
    },
    optimization: {
        minimize: false
    }
}