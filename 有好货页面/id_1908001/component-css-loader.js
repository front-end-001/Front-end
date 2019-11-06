const css = require('css')
module.exports = function (source, map) {

    // const path = this.resourcePath
    console.log(this)
    // const fileName = path.match(/([^\/\\]+)\.css$/)[1]
    // const className = fileName.replace(/^[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/, l => "-" + l.toLowerCase())
    const jsonObject = {}
    const obj = css.parse(source)
    console.log(obj)
    for (const rule of obj.stylesheet.rules) {
        if(rule.type !== 'rule')
            continue
        const p = rule.selectors[0].replace(/\./, '')
        jsonObject[p] = {}
        for(const declaration of rule.declarations) {
            jsonObject[p][declaration.property] = declaration.value
        }
        // rule.selectors = rule.selectors.map(selector => '.' + className + "" + selector)
    }
    return "export default " + JSON.stringify(jsonObject)
}
