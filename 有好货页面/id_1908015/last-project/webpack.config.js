module.exports = {
    entry: './index.js', // 入口文件
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: [['@babel/plugin-transform-react-jsx', {pragma:"h"}]]
                }
              }
            }
        ]
    },
    // webpack-dev-server 配置
    mode: "development",
    devServer: {
      contentBase: './dist',
      hot: true,
      port: 9000,
    },
    optimization: {
        minimize: false
    }
};
