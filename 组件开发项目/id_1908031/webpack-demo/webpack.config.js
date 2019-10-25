module.exports = {
	entry: "./my.component",
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
			},{
				test: /\.component$/,
				use: {
					loader: require.resolve('./component-loader.js')
				}
			}
		]
	},
	mode: "development",
	optimization: {
		minimize: false
	}
}
