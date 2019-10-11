import TabView from "./Tab.js"
import ScrollView from "./Scroll.js"

import Div from "./Div.js"
import Text from "./Text.js"
function myCreate(Class, attributes, ...children){    
    var object = new Class();
    for(let name in attributes) {
        if(name.match(/^on-([\s\S]+)$/)){
            object.addEventListener(RegExp.$1, attributes[name])
        } else {
            object.setAttribute(name, attributes[name]);
        }
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

function loadMore(){
    setTimeout(()=>{
        this.setAttribute("placeHolderText", "没有啦！");
    }, 5000);
}

var c = <TabView style="width:100%;height:100%;">
    <ScrollView tab-title="推荐" placeHolderText="Load More" on-scrolToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    </ScrollView>
    <ScrollView tab-title="有趣的店"  style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightgreen;white-space:normal;font-size:50px">
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    </ScrollView>
    <ScrollView tab-title="品牌新店" style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:red;white-space:normal;font-size:50px">
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    test test test test test test test test test test test test test test test test test test test
    </ScrollView>
</TabView>
c.appendTo(document.body);