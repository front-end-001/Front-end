import Tab from './TabView'
import ScrollView from './ScrollView'
import Text from './Text'

function myCreate(Class, attributes, ...children) {
    var object = new Class()

    for(let name in attributes) {
        object.setAttribute(name, attributes[name])
    }
    for(let child of children) {
        if (typeof child === 'string') {
            object.appendChild(new Text(child))
        } else {
            object.appendChild(child)
        }
    }
    return object
}

var c = <Tab style="width:100%;height:100%">
    <ScrollView tab-title="推荐" style="background-color:lightblue;">123</ScrollView>
    <ScrollView tab-title="有趣的店" style="background-color:lightgreen;"></ScrollView>
    <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
</Tab>

c.appendTo(document.body)




