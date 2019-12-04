import Component from './component.js'
import TabView from './TeacherTab.js'
import ScrollView from './ScrollView.js'
import Div from './Div.js'
import TextView from './TextView.js'

function myCreate(Class, attributes, ...children) {
    let object = new Class();
    console.log(children);
    // const array = Array.from(attributes)

    for(let name in attributes) {
        object.setAttribute(name, attributes[name]);
    }

    for (let child of children) {
        if (typeof child == "string") {
            object.appendChild(new TextView(child))
        } else {
            object.appendChild(child);
        }
    }
    return object;
}

// let a = <Component width="100"></Component>
let a = <TabView style="height: 100%; width: 100%;">
    <ScrollView tab-title="推荐" style="-webkit-overflow-scrolling: touch;background-color: lightblue;white-space: normal;font-size: 50px;">
        
    </ScrollView>
    <ScrollView tab-title="有趣的店" style="background-color: red;"></ScrollView>
    <ScrollView tab-title="品牌新店" style="background-color: yellow;"></ScrollView>
    <ScrollView tab-title="发现" style="background-color: purple;"></ScrollView>
</TabView>
a.appendTo(document.body);