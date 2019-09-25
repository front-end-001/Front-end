import TabView from "./TabView.js";
import ScrollView from "./ScrollView.js"
import Div from "./Div.js";
import Text from "./Text.js";

function myCreate(Class, attributes, ...children){
    var object = new Class();
    // 遍历属性
    for(let name in attributes)
        object.setAttribute(name, attributes[name]);
    
    // 遍历数组
    for( let child of children) {
        if(typeof child == "string") {
            object.appendChild(new Text(child));
        }else{
            object.appendChild(child);
        }
    }
        
    //console.log(children);
    return object; 
}


var c = <TabView style="width:100%;height:100%;">
    <ScrollView tab-title="推荐" style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the fileThe browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the fileThe browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the fileThe browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the fileThe browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the fileThe browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the fileThe browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the fileThe browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the fileThe browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the fileThe browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file

    The browser will download the file
    The browser will download the file
    The browser will download the file
    The browser will download the file
    </ScrollView>
    <ScrollView tab-title="有趣的店"  style="background-color:lightgreen;"></ScrollView>
    <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
</TabView>
c.appendTo(document.body);

