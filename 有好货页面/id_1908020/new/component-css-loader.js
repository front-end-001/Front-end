const css = require('css');
const path = require('path')

function nameFormat(s) {
  return s.replace(/([A-Z])/g,"-$1").toLowerCase();
}

module.exports = function (source, map) {
  // const getFileName = 
  const resourcePath = '/Users/kuaikan/Documents/GitHub/Front-end/有好货页面/id_1908003/goodsProject/src/components/TabView/test.css';
  let arr = resourcePath.split(path.sep);
  arr = arr[arr.length - 1].split('.');
  let name = arr[0];
  console.log(this);
  console.log(source);
  const parseResult = css.parse(source);
  for (let rule of parseResult.stylesheet.rules) {
    if (rule.type === 'rule') {
      rule.selectors = rule.selectors.map(item => {
        return `.${name} ${item}`;
      });
    }
  }
  console.log(parseResult);
  const result = css.stringify(parseResult);
  console.log(result);
  return 'export default ' + JSON.stringify(result);
}
