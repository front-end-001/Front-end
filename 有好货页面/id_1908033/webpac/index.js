// import Carousel from './js/Carousel.js'
 import TabView from './js/TabView.js'
 import ScrollView from './js/ScrollView.js'
 import Div from './js/Div.js'
// import { type } from 'os';
import {create} from './js/create.js';

import ListView from "./js/ListView.js"

// var t = <Text>abc</Text>
function loadMore() {
    // console.log("loadMore")
    setTimeout(() => {
      this.setAttribute("placeHolderText","没有更多了")
    },5000)
}


window.render = function(data,root) {
    var c = <TabView style="width:100%;height:100% ">

    <ScrollView tab-title="推荐" placeHolderText="load more" on-scrollToBottom = {loadMore} style="-webkit-overflow-scrolling:touch; overflow:scroll; background-color:red;white-space:normal;font-size:36px">
       <ListView data={data}></ListView>
    </ScrollView>
    <ScrollView tab-title="有趣的店" style="background-color:green">
    youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
    
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
    
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youquyouqu youqu youqu
        youqu youqu youquyouqu youqu youqu
        youqu youqu youquyouqu youqu youqu
        youqu youqu youquyouqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
    
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
    
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youqu
        youqu youqu youquyouqu youqu youqu
        youqu youqu youquyouqu youqu youqu
        youqu youqu youquyouqu youqu youqu
        youqu youqu youquyouqu youqu youqu
        youqu youqu youqu
    </ScrollView>
    <ScrollView tab-title="品牌新店" style="background-color:yellow"></ScrollView>
    
    </TabView>
    c.appendTo(document.body)
}
