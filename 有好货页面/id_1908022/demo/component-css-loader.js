var css = require('css');

module.exports = function(source, map){
    // console.log(source);

    let filename = this.resourcePath.match(/([^\\]+)\.css$/)[1]; 
    var classname = filename.replace(/^[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/, l => '-' + l.toLowerCase());
    // console.log(classname);
    var obj = css.parse(source);

    let jsObj = {};
    // console.log(obj.stylesheet.rules);

    for(var rule of obj.stylesheet.rules) {
        if(rule.type !== "rule")
            continue; 
        // console.log(rule); 
        
        // var p = selectors[0].replace(/\./, "");
        rule.selectors = rule.selectors.map( selector => '.' + classname + ' ' + selector);
    }

    // css.stringify(obj);
    return "export default " + JSON.stringify(css.stringify(obj));
}