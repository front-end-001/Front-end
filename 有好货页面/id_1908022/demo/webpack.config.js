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
                      plugins: [['babel-plugin-transform-react-jsx', {pragma:"create"}]]
                    }
                }
            },
            {
              test: /\.(png|jpg|jpeg|gif|bmp)$/,
              use: 'url-loader'
            }
        ]
  },
  devServer: {
    contentBase: path.resolve('./dev'),
    /* host: '192.168.1.108',
    port: '8080', */
    hot: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  optimization: {
    minimize: false
  },
  devtool: 'cheap-module-eval-source-map'
};




