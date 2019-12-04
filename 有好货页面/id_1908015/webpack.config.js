module.exports = {
    entry: './index_tab.js',
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
