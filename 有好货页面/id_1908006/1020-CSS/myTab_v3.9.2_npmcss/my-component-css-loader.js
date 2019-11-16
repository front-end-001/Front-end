var css = require('css'); // 这个是 npm install --save-dev css
module.exports = function (source, map) {

    console.log(this.resourcePath)
    var filename= this.resourcePath.match(/([^\/\\]+)\.css$/)[1];
    console.log(filename);
    
    var classname = filename.replace(/^[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/, l => "-"+l.toLowerCase()).replace(/[A-Z]/, l => "-"+l.toLowerCase())

    console.log(classname);

    console.log(source);
    var obj = css.parse(source);

    for (var rule of obj.stylesheet.rules) {
        if (rule.type!="rule") {
            continue;
        }
        rule.selectors = rule.selectors.map(selector => "."+classname +" " + selector);
        console.log(rule.selectors)
    }
    return "export default " + JSON.stringify(css.stringify(obj));
}
