
// import Carousel from '../component/Carousel.js';
import Tab from '../component/Tab.js';
import Div from '../component/Div.js';


function myCreate(Class, attributes, ...children) {
    console.log(children);
    let object = new Class();
    for (let child of children) 
        object.appendChild(child)
    for (let name in attributes) {
        object.setAttribute(name, attributes[name]);
    }
    return object;
}
// class Component {

// }
let c = <Tab style="width:300px;height:300px">
    <Div style="background-color:lightblue"></Div>
    <Div style="background-color:lightgreen"></Div>
    <Div style="background-color:pink"></Div>
</Tab>
c.appendTo(document.body);
