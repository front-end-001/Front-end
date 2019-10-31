var css = require('css');

// 模仿vue处理css的做法
module.exports = function(source, map) {
  // console.log(this.resourceQuery);
  var filename = this.resourcePath.match(/([^\/\\]+)\.css$/)[1];
  let classname = filename.replace(/^[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/, l => '-' + l.toLowerCase());

  var obj = css.parse(source);

  var stylesheet = obj.stylesheet || {};
  var rules = stylesheet.rules || [];
  // 处理每条规则，追加
  for (var rule of rules) {
    if (rule.type != 'rule')
      continue; 

    rule.selectors = rule.selectors.map(selector => '.' + classname + ' ' + selector);
  }
  return 'export default ' + JSON.stringify(css.stringify(obj));
}


// css-in-js
/*
module.exports = function(source, map) {
  var obj = css.parse(source);
  var jsObj = {};
  var stylesheet = obj.stylesheet || {};
  var rules = stylesheet.rules || [];
  // 处理每条规则，追加
  for (var rule of rules) {
    if (rule.type != 'rule')
      continue; 
    
    var p = rule.selectors[0].replace(/\./, '');
    jsObj[p] = {};

    for (var declaration of rule.declarations) {
      jsObj[p][declaration.property] = declaration.value;
    }
  }
  return 'export default ' + JSON.stringify(jsObj);
}
*/