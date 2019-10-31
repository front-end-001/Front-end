// import {Carousel} from "./component.js";
import Tab from "./Tab.js";
import Div from "./Div.js";

function myCreate(Class, attributes, ...children){
    var object = new Class();
    console.log(object)
    // console.log(attributes)
    for(let name in attributes)
        object.setAttribute(name, attributes[name]); // 这样是改attribute（相当于html的属性）
        // object[name] = attributes[name]; // 这样是改property（相当于类的属性）
    for(let child of children)
        // console.log('script, child', child)
        object.appendChild(child)
        
    return object; 
}


// var c = <Carousel width="200"></Carousel>
// c.appendTO(document.body);

var t = <Tab className="tab">
    <Div tab-title="推荐"></Div>
    <Div tab-title="有趣的店"></Div>
    <Div tab-title="品牌新店"></Div>
</Tab>
t.appendTo(document.body)