var css = require('css');

module.exports = function(source, map){
	// 取得组件名称
	var filename = this.resourcePath.match(/([^\/]+)\.css$/)[1];
	// 替换成小写
	var className = filename.replace(/^[A-Z]/, l => l.toLowerCase())
		.replace(/[A-Z]/, l => '-' + l.toLowerCase());
	// 通过CSS解析当前文件
	var obj = css.parse(source);
	// 增加rule
	for (var rule of obj.stylesheet.rules) {
		if(rule.type !== 'rule'){
			continue;
		}
		rule.selectors = rule.selectors.map( selector => '.' + className + ' ' + selector);
	}

	return 'export default ' + JSON.stringify(css.stringify(obj));
};
