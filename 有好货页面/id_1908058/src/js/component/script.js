import TabView from "./TabView.js"
import ScrollView from "./ScrollView.js"

import Div from "./Div.js"
import Text from "./Text.js"
function myCreate(Class, attributes, ...children){
    console.log(children, 33);
    
    var object = new Class();
    for(let name in attributes){
        console.log(name, 5555);
        if(name.match(/^on-([\s\S]+)$/)){
            console.log(name);
            object.addEventListener(RegExp.$1, attributes[name]);
        }else{
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
    console.log("load more");
}

var c = <TabView style="width:100%;height:100%;">
    <ScrollView tab-title="推荐" on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
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
    ddd
    </ScrollView>
    <ScrollView tab-title="品牌新店" style="background-color:pink;">
    vvv
    </ScrollView>
</TabView>
c.appendTo(document.body);