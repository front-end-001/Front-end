// module.exports = {
//   entry: "./script.js",
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//             plugins: [['babel-plugin-transform-react-jsx', {pragma:"myCreate"}]]
//           }
//         }
//       },
//       {
//         test: /\.less$/,
//         exclude:/(node_modules|bower_components)/,
//         use:['style-loader','css-loader','less-loader']
//       },
//       {
//         test: /\.css$/,
//         exclude:/(node_modules|bower_components)/,
//         use:['style-loader','css-loader']
//       },
//       {
//         test: /\.(png|jpg)$/,
//         loader: 'url-loader?limit=8192&name=img/[hash:8].[name].[ext]',
//         options: {
//           publicPath:'/'
//         }
//       }
//     ]
//   },
//   mode: "development",
//   devServer: {
//     contentBase:'./dist',
//     hot:true
//   },
//   optimization: {
//     minimize: false
//   }
// }




module.exports = {
  entry: "./my.component.js",
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
      },
      {
        test: /\.component$/,
        use: {loader: require.resolve('./component-loader.js')}
      }
    ]
  },
  mode: "development",
  devServer: {
    contentBase:'./dist',
    hot:true
  },
  optimization: {
    minimize: false
  }
}
