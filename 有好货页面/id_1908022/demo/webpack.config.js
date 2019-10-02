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
  entry: './src/index.js',
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
    contentBase: path.resolve('./dev'),
    hot: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  optimization: {
    minimize: false
  },
  devtool: 'cheap-eval-source-map'
};




