import TabView from "./component/TabView.js"
import ScrollView from "./component/ScrollView.js"

import Div from "./component/Div.js"
import Text from "./component/Text.js"

import { create } from './create.js';
import ListView from './component/ListView'


function loadMore(){
    console.log("load more");
    setTimeout(()=>{
        console.log("no more");
        this.setAttribute("placeHolderText", '没有更多了');
    }, 500);
}

// var c = myCreate( TabView, {style: "width:100%;height:100%;"}, myCreate(ScrollView, {"tab-title":"推荐"}) )

window.render = function(data){

var c = <TabView style="width:100%;height:100%;">
    <ScrollView tab-title="推荐" placeHolderText="加载更多" on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
    <ListView className={"x"} cls={"mmmm"} data={data} >ddddddddd</ListView>
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
    <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
</TabView>
c.appendTo(document.body);

}