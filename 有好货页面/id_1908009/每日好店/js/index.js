import Tab from '../commponents/Tab.js';
import Scroll from '../commponents/Scroll.js';
function myCreate(Class, attributs, ...children) {
    var object = new Class()
    for (let name in attributs)
        object.setAttribute(name, attributs[name])
    for (let child of children)
        object.appendChild(child)
    return object
}

let app = document.getElementById('app')
var tab = <Tab style='width:100%;height:calc(100% - 0.5rem);'>
    <Scroll tab-title='推荐' style='background:green'></Scroll>
    <Scroll tab-title='有趣的店' style='background:gray' ></Scroll>
    <Scroll tab-title='品牌新店' style='background:red' ></Scroll>
</Tab>
tab.appendTo(app)