import { create } from "./create.js"
import TabView from "./TabView.js"
import ScrollView from "./ScrollView.js"
import ListView from "./ListView.js"
import Div from "./Div.js"


function loadMore(){
    setTimeout(()=>{
        this.setAttribute("placeHolderText","没有更多啦！")
    },5000);
}
window.render = function(data, root){
    var c = <TabView style="width:100%;height:100%;">
        <ScrollView tab-title="推荐" placeHolderText="load more" on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
            <ListView data={data}></ListView>
        
        </ScrollView>
        <ScrollView tab-title="有趣的店" placeHolderText="load more" on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightgreen;white-space:normal;font-size:50px"> abc abc abc  abc abc abc
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
        <ScrollView tab-title="品牌新店"  placeHolderText="load more" on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:pink;white-space:normal;font-size:50px"> abc abc abc  abc abc abc
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
        abc abc abc abc abc abc</ScrollView>
    </TabView>
    c.appendTo(document.body);
}