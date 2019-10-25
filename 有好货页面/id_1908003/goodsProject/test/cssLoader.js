const path = require('path')
const fs = require('fs-extra')
const loader = require('../component-css-loader');

const template = fs.readFileSync(path.resolve(__dirname, '../src/components/TabView/test.css'), 'utf8');
loader(template);
