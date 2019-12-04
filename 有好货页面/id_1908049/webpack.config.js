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
                        plugins: [['babel-plugin-transform-react-jsx', {pragma:"create"}]]
                    }
                }
            },
            {
                test: /\.component$/,
                use: {
                    loader: require.resolve('./component-loader.js')
                }
            },
            // {
            //     test: /\.css$/i,
            //     use: [require.resolve('./component-css-loader.js')],
            // },
            {
                test: /\.css$/,
                use: [
                  // style-loader
                  { loader: 'style-loader' },
                  // css-loader
                  {
                    loader: 'css-loader',
                    // options: {
                    //     modules: true
                    //   }
                  },
                  // sass-loader
                //{ loader: 'sass-loader' }
                ]
              },
              {
                test: /\.(?:svg|png)/,
                use: 'file-loader'
              }
        ]
    },
    mode: "development",
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    optimization: {
        minimize: false
    }
}