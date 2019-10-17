import Tab from './Tab';
import Div from './Div';

function myComponent(Class, attributes, ...children){
    let object = new Class;
    console.log(Class, attributes, children);
    for(let name in attributes){
        object.setAttribute(name, attributes[name])
    }
    for(let child of children){
        object.appendChild(child);
    }
    return object;
}


var c = <Tab>
    <Div tab-title="推荐"></Div>
    <Div tab-title="有趣的店"></Div>
    <Div tab-title="品牌新店"></Div>
</Tab>

c.appendTo(document.body);