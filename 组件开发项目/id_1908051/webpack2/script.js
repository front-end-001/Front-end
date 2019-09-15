import Tab from "./Tab";
import Div from "./Div";

function myCreate(Class, attributes, ...children){
    var object = new Class();
    for(let name in attributes)
        object.setAttribute(name, attributes[name]);
    for(let child in children)
        object.appendChild(children[child]);
    return object;
}

let c = <Tab style="width: 100%;height: 300px;">
    <Div tab-title="推荐"></Div>
    <Div tab-title="有趣的店"></Div>
    <Div tab-title="品牌新店"></Div>
</Tab>
c.appendTo(document.body);