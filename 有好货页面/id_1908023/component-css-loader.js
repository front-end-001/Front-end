const css = require('css')
// const ceeTree = require('css-tree');
module.exports = function (source, map) {
  let filename = this.resourcePath.match(/([^\/\\]+)\.css$/)[1];
  let classname = filename.replace(/[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/, l => '-' + l.toLowerCase())
  let jsobj = {}
  const obj = css.parse(source);
  // const parse2 = ceeTree.parse(source);
  // console.log(parse.stylesheet.rules);
  // console.log(parse2.children.head);
  for (let rule of obj.stylesheet.rules) {
    // rule.selectors = rule.selectors.map(s => "." + classname + ' ' + s);
    if (rule.type !== 'rule') 
      continue;
    let p = rule.selectors[0].replace(/\./, "");
    // console.log(p);
    jsobj[p] = {};
    // console.log(rule.declarations);
    for (var declaration of rule.declarations) {
      jsobj[p][declaration.property] = declaration.value;
    }
  }
  console.log(jsobj);
  return 'export default' + JSON.stringify(jsobj);
}