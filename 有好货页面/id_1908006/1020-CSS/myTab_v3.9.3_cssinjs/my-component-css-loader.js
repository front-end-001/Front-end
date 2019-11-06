var css = require('css'); // 这个是 npm install --save-dev css
module.exports = function (source, map) {

    var filename= this.resourcePath.match(/([^\/\\]+)\.css$/)[1];
    
    var classname = filename.replace(/^[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/, l => "-"+l.toLowerCase()).replace(/[A-Z]/, l => "-"+l.toLowerCase())

    var obj = css.parse(source);

    var jsobj = Object.create(null);

    for (var rule of obj.stylesheet.rules) {
        if (rule.type!="rule") {
            continue;
        }

        var p = rule.selectors[0].replace(/\./,"");

        jsobj[p]={};

        console.log(rule.declarations);

        //rule.selectors = rule.selectors.map(selector => "."+classname +" " + selector);
        //console.log(rule.selectors)
        
        for (var declaration of rule.declarations) {
            console.log(declaration);
            jsobj[p][declaration.property] = declaration.value;
        }
    }
    console.log(jsobj);
    console.log(JSON.stringify(jsobj));
    return "export default " + JSON.stringify(jsobj);  // 这里返回的是一个json的字符串（或者叫文件），在外面 import css from 时，其实就是赋值给了css。 因此style={css.x}
}
