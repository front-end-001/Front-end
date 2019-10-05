const path = require('path')
const pathResolve = targetPath => path.resolve(__dirname, targetPath)

module.exports = {
    entry: './src/index.js',
    output: {
        path: pathResolve('dist'),
        filename: 'bundle.js',
    }
}
