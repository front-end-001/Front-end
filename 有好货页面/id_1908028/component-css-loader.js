/*
 * @Author: your name
 * @Date: 2019-10-27 17:20:27
 * @LastEditTime: 2019-10-27 17:20:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /Front-end/有好货页面/id_1908028/component-css-loader.js
 */
var css = require("css");

module.exports = function(source, map) {
  console.log(this.resourceQuery);
  var filename = this.resourcePath.match(/([^\/\\]+)\.css$/)[1];
  var classname = filename
    .replace(/^[A-Z]/, l => l.toLowerCase())
    .replace(/[A-Z]/, l => "-" + l.toLowerCase());
  console.log(classname);

  var jsobj = {};

  var obj = css.parse(source);
  for (var rule of obj.stylesheet.rules) {
    if (rule.type !== "rule") continue;
    //console.log(rule);

    var p = rule.selectors[0].replace(/\./, "");

    jsobj[p] = {};

    console.log(rule.declarations);

    for (var declaration of rule.declarations) {
      jsobj[p][declaration.property] = declaration.value;
    }
    //rule.selectors = rule.selectors.map( selector => "." + classname + " " + selector);
  }
  console.log(jsobj);
  return "export default " + JSON.stringify(jsobj);
};
