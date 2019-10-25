var css = require('css'); // 不支持 css文件中包含注释，使用type进行判断

module.exports = function (source, map) {
    //console.log(this);

    //var pathname = this.resourcePath.match(/([^/\\]+)\.css$/)[1];
    //console.log(pathname);
    //var className = pathname.replace(/^[A-Z]/, l=>l.toLowerCase()).replace(/[A-Z]/, l=> "-" + l.toLowerCase());
    //console.log(className);
    

    var obj = css.parse(source);

    //console.log(obj.stylesheet.rules);
    
    var jsobj = {};

    for( var rule of obj.stylesheet.rules) {
        //过滤注释内容
        if(rule.type !== "rule") {
            continue;
        }

        var p = rule.selectors[0].replace(/\./, "");

        jsobj[p] = {};

        //console.log(rule.declarations);

        for(var declaration of rule.declarations) {
            jsobj[p][declaration.property] = declaration.value;
        }

        //rule.selectors = rule.selectors.map(selector => "."+ className + " " +selector );
    }

    return "export default " + JSON.stringify(jsobj);
}