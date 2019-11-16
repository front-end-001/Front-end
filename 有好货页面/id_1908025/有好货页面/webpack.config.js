var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./index.js",
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
	        		test: /\.css$/i,
			        // use: [require.resolve('./component-css-loader.js')],
			        // use: ['to-string-loader', 'css-loader'],
			        use: ['style-loader', 'css-loader'],
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
			      {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                },
              },
            ],
          }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
    	filename: 'index.html',
    	template: './index.html'
    })],
    mode: "development",
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    optimization: {
        minimize: false
    }
}