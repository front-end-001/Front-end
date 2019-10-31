let css = require('css');

module.exports = function (source, map) {
    let filename = this.resourcePath.match(/([^\/\\]+)\.css$/)[1];
    filename = filename.replace(/^[A-Z]/, l => l.toLowerCase())
        .replace(/[A-Z]/, l => '-' + l.toLowerCase());

    console.log(filename);
    let obj = css.parse(source);
    for (let rule of obj.stylesheet.rules) {
        if (rule.type === 'rule') {
            rule.selectors = rule.selectors.map(selector => `.${filename} ${selector}`);
        }

    }
    return "export default " + JSON.stringify(css.stringify(obj));
};
