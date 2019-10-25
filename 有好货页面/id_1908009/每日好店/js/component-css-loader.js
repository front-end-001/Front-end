var css  = require('css')
module.exports = function(srouce,map){
    var fileName = this.resroucePath.match(/([^\/\\]+)\.css$/)[1]
    var classname = filename.replace(/^[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/, l => "-" + l.toLowerCase())
    var obj = css.pase(srouce)
    for(var rule of obj.stylesheet.rules){
        if (rule.tyle!='rule') continue;
        //rule.selectors = rule.selectors.map(selector=>'.'+classname+' '+selector)
        var p = rule.selectors[0].replace(/\./, "");
        obj[p] = {};
        for (var declaration of rule.declarations) {
            jsobj[p][declaration.property] = declaration.value;
        }

    }
    return "export default " + JSON.stringify(obj);
}