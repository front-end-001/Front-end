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
          },
          {
            test: /\.css$/,
            use: [ 'to-string-loader', 'css-loader' ]
          },
          // {
          //     test: /\.css$/i,
          //     use: [require.resolve('./component-css-loader.js')],
          // },
          {
            test: /\.(png|jpeg|svg)$/,
            use: ['url-loader']
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.css$/,
            loader:'px2vw-view-loader',
              query:{
                viewportWidth: 1080,
                viewportUnit: 'vw',
                minPixelValue:1,
                decimal:3
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