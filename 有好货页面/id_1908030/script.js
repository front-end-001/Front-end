import ScrollView from "./ScrollView.js";
import TabView from "./TabView.js";
import Div from "./Div.js";
import Text from "./Text.js";

function myCreate(Class, attributes, ...children){
    var object = new Class();
    for (let name in attributes)
        object.setAttribute(name, attributes[name]);
    for (let child of children) {
        if (typeof child == "string") {
            object.appendChild(new Text(children));
        } else {
            object.appendChild(child);    
        }
    }
    return object; 
}

var c = <TabView>
    <ScrollView tab-title="首页" style="background-color:blue;">dsfdsfs</ScrollView>
    <ScrollView tab-title="推荐" style="background-color:blue;">dsfds</ScrollView>
    <ScrollView tab-title="dfg" style="background-color:red;">sdfdsfsd</ScrollView>
</TabView>

c.appendTo(document.body);













// import Carousel from "./carousel.js";

// console.log(8759696968, Carousel);

// function myCreate(Class, attributes){
//     var object = new Class();
//     for(let name in attributes)
//         // object.setAttribute(name, attributes[name]);
//         object[name] = attributes[name];
//     return object; 
// }


// let data = ["https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
// "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
// "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
// "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"];

// var c = <Carousel width="100" imgsData={data}></Carousel>
// c.appendTo(document.body);