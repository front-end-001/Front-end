import { Carousel } from "./components/Carousel.js";
// import { Tab } from "./components/Tab.js";
// import Div from './components/Div';
//
// function myCreate(Class, attributes, ...children){
//     var object = new Class();
//     console.log(Class, attributes, ...children);
//     for(let name in attributes) {
//         if(/^on/.test(name)) {
//             let event = name.replace(/^on/, '');
//             event = event[0].toLowerCase() + event.slice(1);
//             object.addEventListener(event, attributes[name]);
//         } else {
//             object[name] = attributes[name];
//         }
//     }
//     for(let child of children)
//         object.appendChild(child);
//     return object;
// }
// ''
// const imgList = [
//     "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
//     "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
//     "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
//     "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
// ];
//
// const tabInfo = [{
//     src: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
//     name: '一个名字'
// }, {
//     src: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
//     name: '一个名字'
// }, {
//     src: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
//     name: '一个名字'
// }, {
//     src: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
//     name: 'faaa 一个名字'
// }];
//
//
//
// // var c = <Carousel onPanend={(data) => console.log('onPanend', data)} data={imgList}></Carousel>;
// // c.appendTo(document.getElementById('container'));
// var d = <Tab onPanend={(data) => console.log('onPanend', data)} data={tabInfo}>
//     <Div data={1}><Div></Div></Div>
//     <Div></Div>
//     <Div></Div>
// </Tab>;
//
//
// d.appendTo(document.getElementById('container'));



import Tab from "./winter/Tab.js"
import Div from "./winter/Div.js"
import Text from './winter/Text';
import ScrollView from './winter/ScrollView';

function myCreate(Class, attributes, ...children){
    var object = new Class();
    for(let name in attributes)
        object.setAttribute(name, attributes[name]);
    for(let child of children)
        if(typeof child === "string") {
            object.appendChild(new Text(child));
        } else {
            object.appendChild(child);
        }
    return object;
}


var c = <Tab style="width:100%;height:500px;" width={500}>
    <Div tab-title="推荐" style="background-color:lightblue; overflow: scroll">
        <ScrollView>
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
        </ScrollView>
    </Div>
    <Div tab-title="有趣的店"  style="background-color:lightgreen;"></Div>
    <Div tab-title="品牌新店" style="background-color:pink;"></Div>
</Tab>
c.appendTo(document.body);
