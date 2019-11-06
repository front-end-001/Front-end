//业务代码
import TabView from "./components/TabView";
import ScrollView from "./components/ScrollView";
import ListView from "./components/ListView";

import Div from "./components/Div";
import {create} from './create'


function loadMore() {
    console.log("load more");
    setTimeout(() => {
        this.setAttribute("placeHolderText", "没有更多了！")
    }, 1000);
}

window.render = function(obj, root) {
    /* on-scrollToBottom={loadMore.bind(this, 'my')} */
    var c = <TabView style="width:100%;height:100%;">
        <ScrollView tab-title="推荐" placeHolderText="load more" on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
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
        <ScrollView tab-title="有趣的店"  style="background-color:lightgreen;">
            <ListView data={obj}></ListView>
        </ScrollView>
        <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
    </TabView>
    c.appendTo(root);
}

