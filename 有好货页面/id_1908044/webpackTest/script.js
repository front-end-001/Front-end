import TabView from "./TabView.js"
import ScrollView from "./ScrollView.js"

import Div from "./Div.js"
import Text from "./Text.js"
function myCreate(Class, attributes, ...children){
  console.log(children);

  var object = new Class();
  for(let name in attributes)
    if(name.match(/^on-([\s\S]+)$/)){
      object.addEventListener(RegExp.$1,attributes[name])
    } else{
      object.setAttribute(name, attributes[name]);
    }
  for(let child of children) {
    if(typeof child === "string") {
      object.appendChild(new Text(child));
    } else {
      object.appendChild(child);
    }
  }
  return object;
}
function loadMore() {
  console.log('到底部了....')
}
function loadRefresh() {
  console.log('开始刷新...')
}
var c = <TabView style="width:100%;height:2000px">
  <ScrollView tab-title="推荐" on-scrollTotop={loadRefresh}  on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
    abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
    abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc     abc abc abc  abc abc abc
    abc abc abc abc abc abc
  </ScrollView>
  <ScrollView tab-title="有趣的店"  style="background-color:lightgreen;"></ScrollView>
  <ScrollView tab-title="品牌新店" style="background-color:pink;height:600px"></ScrollView>
</TabView>
c.appendTo(document.body);
