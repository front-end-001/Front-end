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
            }
        ]
    },
    mode: "development",
    optimization: {
        minimize: false
    }
}