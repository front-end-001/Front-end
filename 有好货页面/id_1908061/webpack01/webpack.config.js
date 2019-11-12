const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        index:'./src/index.js',
    },
    output:{
        path: path.join(__dirname,'dist'),
        filename: '[name].js'
    },
    mode:'production',
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/preset-react'],
                plugins: [['babel-plugin-transform-react-jsx', {pragma:"create"}]]
              }
            }
          }
          // {
          //   test: /\.component$/,
          //   use: {
          //     loader:require.resolve('./component-loader.js')
          //   }
          // }
        ]
    },
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
};