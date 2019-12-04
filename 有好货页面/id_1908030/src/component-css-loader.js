var css = require('css');

module.exports = function (source, map) {
    console.log(this.resourceQuery);
    let filename = this.resourcePath.match(/([^\/\\]+)\.css$/)[1];
    let classname = filename.replace(/^[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/, l => "-" + l.toLowerCase())
    console.log(classname);


    let jsobj = {};

    let obj = css.parse(source);
    for(let rule of obj.stylesheet.rules) {
        if(rule.type !== "rule")
            continue;
        //console.log(rule);

        // let p = rule.selectors[0].replace(/\./, "");

        // jsobj[p] = {};

        // console.log(rule.declarations);

        // for(let declaration of rule.declarations) {
        //     jsobj[p][declaration.property] = declaration.value;
        // }
        rule.selectors = rule.selectors.map( selector => "." + classname + " " + selector);
    }
    console.log(jsobj);
    // return "export default " + JSON.stringify(jsobj);
    return "export default " + JSON.stringify(css.stringify(obj));
}