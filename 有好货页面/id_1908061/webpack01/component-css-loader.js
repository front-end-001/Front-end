var css = require('css');
module.exports = function (source, map) {
    // console.log(this.resourceQuery);
    var filename = this.resourcePath.match(/([^\/\\]+)\.css$/)[1];
    var classname = filename.replace(/^[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/, l => "-" + l.toLowerCase());
    var obj = css.parse(source);

    for(var rule of obj.stylesheet.rules) {
        if(rule.type !== "rule")
            continue;
        rule.selectors = rule.selectors.map( selector => "." + classname + " " + selector);
    }
    return "export default " + JSON.stringify(css.stringify(obj));
};