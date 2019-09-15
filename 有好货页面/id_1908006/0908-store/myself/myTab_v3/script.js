import {MyTabView} from "./myTabView.js";
import {MyScrollView} from "./myScrollView.js";
import {MyDiv} from "./myDiv.js";

function myCreate(Class, attributes, ...children){
    var object = new Class();
    for(let name in attributes) // 遍历属性
        object.setAttribute(name, attributes[name]);

    for(let child of children) { // 遍历集合类元素，如array， set等
        object.appendChild(child);
    }
    return object; 
}

// MyTab 这里是 Class, 然后 childrne 是下面的MyDiv

var c = <MyTabView style="width:100%; height:100%">
    <MyScrollView tab-title="推荐" style="background-color:lightblue;">
    </MyScrollView>
    <MyScrollView tab-title="有趣的店" style="background-color:lightgreen;"></MyScrollView>
    <MyScrollView tab-title="品牌新店" style="background-color:pink;"></MyScrollView>
</MyTabView>
c.appendTo(document.body);

