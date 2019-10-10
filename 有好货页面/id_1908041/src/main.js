import "./assets/css/base.css";
//import "./assets/css/tab.css";
import TabView from "./components/TabView.js";
import Text from "./components/Text.js";
import ScrollView from "./components/ScrollView";
function myCreate(Class, attributes, ...children) {
  var object = new Class();
  for (let name in attributes) {
    if(name.match(/^on-([\s\S]+)$/)){
      object.addEventListener(RegExp.$1,attributes[name])
    }else{
      object.setAttribute(name, attributes[name]);
    }
  }
  for (let child of children) {
    if (typeof child == "string") {
      object.appendChild(new Text(child));
    } else {
      object.appendChild(child);
    }
  }
  return object;
}
function loadMore(){
  console.log("load more")
}
var c = (
  <TabView class="tab">
    <ScrollView
      tab-title="推荐"
      style="background-color: lightgreen"
      on-scrollToBottom={loadMore}
      placeHolderText="load more"
    >
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述 
      文字描述 文字描述 文字描述 文字描述
    </ScrollView>
    <ScrollView
      tab-title="有趣的店"
      style="background-color:lightcoral"
    ></ScrollView>
    <ScrollView
      tab-title="品牌好店"
      style="background-color:blueviolet"
    ></ScrollView>
  </TabView>
);
c.appendTo(document.body);
