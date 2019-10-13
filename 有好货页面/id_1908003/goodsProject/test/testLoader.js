const path = require('path')
const fs = require('fs-extra')
const loader = require('../component-loader');

const template = fs.readFileSync(path.resolve(__dirname, '../my.component'), 'utf8');
loader(template);
