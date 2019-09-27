import Tab from './Tab.js';
import Div from './Div.js';

function myCreate(Class, attributes, ...children) {
	var object = new Class();
	for (let name in attributes)
		if (attributes.hasOwnProperty(name))
			object.setAttribute(name, attributes[name]);
	for (let child of children) {
		object.appendChild(child);
	}
	return object;
}


var c = <Tab style="width: 100%;height:500px;">
	<Div tab-title='推荐' active={true} style="background-color: lightgreen"></Div>
	<Div tab-title="有趣的店" style="background-color: lightblue"></Div>
	<Div tab-title="品牌新店" style="background-color: pink"></Div>
</Tab>;
c.appendTo(document.body);
