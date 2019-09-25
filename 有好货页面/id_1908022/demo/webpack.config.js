 /*{ 
    entry: "./index.js",
    module: {
        rules: [
            {
                test: /\.frag$/,
                loader: "glsl-vue-loader"
            }
        ]
    },
    mode: "development",
    optimization: {
        minimize: false
    }
}*/
var path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  module: {
        rules: [
            {
                test: /\.frag$/,
                loader: "glsl-vue-loader"
            },
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
  devServer: {
    contentBase: './dist',
    hot: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  },
  optimization: {
    minimize: false
  }
};




