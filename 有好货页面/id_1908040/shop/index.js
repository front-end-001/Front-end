import TabView from './components/TabView.js';
import ScrollView from './components/ScrollView.js';
import TextView from './components/TextView.js';

// jsx的实现原理
function create(Class, attributes, ...children) {
  var object = new Class();
  for (let name in attributes) {
    // attribute
    object.setAttribute(name, attributes[name]);
  }
  for (let child of children) {
    if (typeof child === 'string') {
      object.appendChild(new TextView(child));
    } else {
      object.appendChild(child);
    }
  }
  return object;
}

var c = (
  <TabView style="width:100%;height:100%;">
    <ScrollView
      tab-title="推荐"
      style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:lightblue;font-size:50px;"
    >
        推荐
    </ScrollView>
    <ScrollView
      tab-title="有趣的店"
      style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:lightblue;font-size:50px;"
    >
        有趣的店
    </ScrollView>
    <ScrollView
      tab-title="品牌新店"
      style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:lightblue;font-size:50px;"
    >
        品牌新店
    </ScrollView>
  </TabView>
);

c.appendTo(document.body);
