import TabView from './src/TabView.js'
import ScrollView from './src/ScrollView.js';
import "./src/Config.scss"
import "./src/Config.js"


function create(Class, attributes, ...children){
    let object = new Class()
    for(let name in attributes){
        if(name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, attributes[name])
        } else {
            object.setAttribute(name, attributes[name]);
        }
    }

    for(let child of children) {
        object.appendChild(child)
    }

    return object
} 

let test = (
    <TabView className={"tabContainer"}>
        <ScrollView title="推荐" className={"scroll"} active={true}></ScrollView>
        <ScrollView title="有趣的店" className={"scroll"}></ScrollView>
        <ScrollView title="品牌新店" className={"scroll"}></ScrollView>
        <ScrollView title="发现" className={"scroll"}></ScrollView>
    </TabView>
)

test.appendTo(document.body)