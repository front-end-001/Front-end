module.export = { 
    entry: "./src/script.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-2',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: [['babel-plugin-transform-react-jsx2', {pragma:"myCreate"}]]
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: false
    }
}