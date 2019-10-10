import TabView from './Tab.js';
import Text from './Text.js';
import ScrollView from './Scroll.js';

function myCreate(Class, attributes, ...children) {
	var object = new Class();
	for (let name in attributes) {
		if(name.match(/^on-([\s\S])+$/)){
			object.addEndEventListener(RegExp.$1,attributes[name])
		} else {
			object.setAttribute(name, attributes[name]);
		}
	}
	for (let child of children) {
		if (typeof child === 'string') {
			object.appendChild(new Text(child))
		} else {
			object.appendChild(child);
		}
	}
	return object;
}

function loadMore(){

}


var c =<TabView style = "width:100%;height:100%;" >
	<ScrollView tab-title="推荐" on-scrolToBottom={loadMore} active='true' style="-webkit-overflow-scroll:touch;overflow:scroll;background-color:lightblue;white-space:normal;">

	</ScrollView>
	<ScrollView tab-title="有趣的店" style="background-color:lightgreen;"></ScrollView>
	<ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
	</TabView>
c.appendTo(document.body);
