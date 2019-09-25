import TabView from './Tab'
import Text from './Text'
import ScrollView from './ScrollView'

function myCreate(Class, attributes, ...children) {
    var object = new Class();
    for (let name in attributes)
        object.setAttribute(name, attributes[name]);
    for (let child of children) {
        if (typeof child === 'string') {
            object.appendChild(new Text(child))
        } else {
            object.appendChild(child)
        }
    }
    return object;
}


var c = <TabView style="width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column">
    <ScrollView tab-title="推荐">
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgf
        dgfdgdfgdfgfgdgfdgfdgdfgdfgfgdgf



    </ScrollView>
    <ScrollView tab-title="有趣的店"></ScrollView>
    <ScrollView tab-title="品牌新店"></ScrollView>
</TabView>
c.appendTo(document.body);
