var css = require('css');
module.exports = function(source, map){
    var filename = this.resourcePath.match(/([^\/\\]+)\.css$/)[1];
    var classname= filename.replace(/^[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/,l=>"-" + l.toLowerCase());
    var obj=css.parse(source);
    var jsobj = {};
    for (var rule of obj.stylesheet.rules){
        if (rule.type!=="rule")
            continue;
        //rule.selectors = rule.selectors.map(selector => "."+classname + selector);
        var p = rule.selectors[0].replace(/\./, "");
        jsobj[p] = {};
    }
    
    for (var declaration of declarations){
        jsobj[p][declaration.property] = declaration.value;
    }

    return "export default " + JSON.stringify(css.stringify(jsobj));
    //return "export default "+JSON.stringify(css.stringify(obj));
}