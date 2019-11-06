import {MyTabView} from "./myTabView.js";
import {MyScrollView} from "./myScrollView.js";
import {MyDiv} from "./myDiv.js";
//import {MyText} from "./myText.js";
import {myCreate} from "./myCreate.js"
import {MyListView} from "./myListView.js";

/*
function myCreate(Class, attributes, ...children){
    var object = new Class();
    for(let name in attributes) { // 遍历属性
        if  (name.match(/^on-([\s\S]+$)/)) {
            object.addEventListener(RegExp.$1, attributes[name]);
        }else{
            object.setAttribute(name, attributes[name]);
        }


    } 

    for(let child of children) { // 遍历集合类元素，如array， set等
        if (typeof child === "string") {
            object.appendChild(new MyText(child));
        }else {
            object.appendChild(child);
        }
    }
    return object; 
}
*/

function loadMore() {
    console.log("load more");

    setTimeout(()=> {
        this.setAttribute("placeHolderText", "no more...");
    },3000)
}

// MyTab 这里是 Class, 然后 childrne 是下面的MyDiv

window.render = function(data, root) {
    console.log("use window.render()");
    var c = <MyTabView style="width:100%; height:100%">
        <MyScrollView tab-title="推荐" on-scrollToBottom={loadMore} placeHolderText = "Load More ..." style="-webkit-overflow-scrolling:touch;background-color:lightblue;white-space:normal;font-size:50px;overflow:scroll;">
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk

        </MyScrollView>
        <MyScrollView tab-title="有趣的店" style="background-color:lightgreen;">
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        123 456 789  0ab cde fgh igk
        </MyScrollView>
        <MyScrollView tab-title="品牌新店" style="background-color:pink;">
        <MyListView data={data}></MyListView>
        </MyScrollView>
    </MyTabView>
    c.appendTo(document.body);
}
