var css = require('css');

module.exports = function (source, map) {
    // console.log(this.resourceQuery);
    var filename = this.resourcePath.match(/([^\/\\]+)\.css$/)[1];
    var className = filename.replace(/^[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/, l => "-" + l.toLowerCase())
    // console.log(className);


    var jsObj = {};

    var obj = css.parse(source);
    for(var rule of obj.stylesheet.rules) {
        if(rule.type !== "rule")
            continue;
        //console.log(rule);

        var p = rule.selectors[0].replace(/\./, "");

        jsObj[p] = {};

        // console.log(rule.declarations);

        for(var declaration of rule.declarations) {
            jsObj[p][declaration.property] = declaration.value;
        }
        //rule.selectors = rule.selectors.map( selector => "." + className + " " + selector);
    }
    console.log(jsObj);
    return "export default " + JSON.stringify(jsObj);
}