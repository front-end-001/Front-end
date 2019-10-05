import TabView from "./TabView.js"
import ScrollView from "./ScrollView.js"
import Text from "./Text.js"
import ListView from './ListView'
import {create} from './create'
// function myCreate(Class, attributes, ...children){    
//     var object = new Class();
//     for(let name in attributes) {
//         if(name.match(/^on-([\s\S]+)$/)){
//             object.addEventListener(RegExp.$1, attributes[name])
//         } else {
//             object.setAttribute(name, attributes[name]);
//         }
//     }
        
//     for(let child of children) {
//         if(typeof child === "string") {
//             object.appendChild(new Text(child));
//         } else {
//             object.appendChild(child);
//         }
//     }
    
//     return object; 
// }


function loadMore(){
    //console.log(a);
    //console.log("load more");
    //console.log(this);
    setTimeout(()=>{
        this.setAttribute("placeHolderText", "没有更多啦！");
    }, 5000 );
}

window.render = function(data, root) {
    // console.log(data, root)
    var c = (
        <TabView style="width:100%;height:100%;">
            <ScrollView 
                tab-title="推荐" 
                placeHolderText="load more" 
                on-scrolToBottom={loadMore} 
                style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
                <ListView data={data}></ListView>
            </ScrollView>
            <ScrollView tab-title="有趣的店" style="-webkit-overflow-scrolling:touch;background-color:lightgreen;white-space:normal;font-size:50px;font-size:50px;overflow:scroll;">
            def def def def def def def def def
             def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def 
            def def def def def def def def def def def def def def def def def def 
        
            </ScrollView>
            <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
        </TabView>
    );
    c.appendTo(root);
}


