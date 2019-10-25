import TabView from "./js/TabView.js"
import ScrollView from "./js/scrollView.js"
import ListView from "./js/ListView.js"

import Div from "./js/Div.js"
import {create} from "./js/create.js"

import tree from "./my.component";


function loadMore(){
  setTimeout(()=>{
    this.setAttribute("placeHolderText", "没有更多啦！");
  }, 5000);
}

window.render = function(data, root){
  var c = <div>
    <span class="x">abc</span>
    <ListView style="abc:1" data={[{a:1, b:2}]}></ListView>
  </div>
  c.appendTo(document.body);
}

// import TabView from "./js/TabView.js"
// import ScrollView from "./js/scrollView.js"
// import Carousel from "./js/Carousel.js"
// import List from "./js/List.js"
// import ListContent from "./js/List-content.js"
//
// import Div from "./js/Div.js"
// import Image from "./js/Image.js"
// import Text from "./js/Text.js"
// function myCreate(Class, attributes, ...children){
//   console.log(children);
//
//   var object = new Class();
//   for(let name in attributes)
//     if(name.match(/^on-([\s\S]+)$/)){
//       object.addEventListener(RegExp.$1,attributes[name])
//     } else{
//       object.setAttribute(name, attributes[name]);
//     }
//   for(let child of children) {
//     if(typeof child === "string") {
//       object.appendChild(new Text(child));
//     } else {
//       object.appendChild(child);
//     }
//   }
//   return object;
// }
// function loadMore() {
//   console.log('到底部了....')
// }
// function loadRefresh() {
//   console.log('开始刷新...')
// }
// var c = <TabView style="width:100%;height:2000px" class="back-icon">
//   <ScrollView tab-title="推荐" on-scrollTotop={loadRefresh}  on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;font-size:50px">
//     <Carousel class="swiper-div">
//       <Image src="http://192.168.1.102:8080/img/banner1.png"></Image>
//       <Image src="http://192.168.1.102:8080/img/banner2.png"></Image>
//       <Image src="http://192.168.1.102:8080/img/banner3.png"></Image>
//     </Carousel>
//     <List class="list-content">
//       <ListContent tab-title="极客时间旗舰店" isTmall="http://192.168.1.102:8080/img/icon-tmall.png" src="http://192.168.1.102:8080/img/icon InfoQ@3x.png"></ListContent>
//     </List>
//     <List class="list-content">
//       <ListContent tab-title="极客时间旗舰店" isTmall="http://192.168.1.102:8080/img/icon-tmall.png" src="http://192.168.1.102:8080/img/icon InfoQ@3x.png"></ListContent>
//     </List>
//
//   </ScrollView>
//   <ScrollView tab-title="有趣的店"  style=""></ScrollView>
//   <ScrollView tab-title="品牌新店" style="height:600px"></ScrollView>
// </TabView>
// c.appendTo(document.body);
