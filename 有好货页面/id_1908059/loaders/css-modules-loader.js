const css = require("css");
const md5 = require("md5");
module.exports = function(source, map) {
  const filename = this.resourcePath.match(/([^\/\\]+)\.css$/)[1];
  const {
    stylesheet: { rules }
  } = css.parse(source);
  const cssObj = {};
  const localMap = {};
  for (const rule of rules) {
    if (rule.type !== "rule") continue;
    const p = rule.selectors[0].replace(/\./, "");
    const localHashName = `${filename.replace('.module', '')}_${md5(`${filename}_${p}`)}`;
    localMap[p] = localHashName;
    cssObj[localHashName] = {};
    for (const declaration of rule.declarations) {
      cssObj[localHashName][declaration.property] = declaration.value;
    }
  }

  const cssString = Object.keys(cssObj)
    .map(
      k =>
        `.${k} {\\n${Object.keys(cssObj[k])
          .map(property => {
            return `${property}: ${cssObj[k][property]};`;
          })
          .join("")}}`
    )
    .join("\\n");

  return `exports = module.exports = require("../../node_modules/css-loader/dist/runtime/api.js")(false);
    // Module
   exports.push([module.id, '${cssString}']);
   exports.locals = ${JSON.stringify(localMap)};
`;
};
