import TabView from './TabView'
import Text from './Text'
import ScrollView from './ScrollView'
import Div from './Div'

function myCreate(Class, attributes, ...children) {
    var object = new Class();
    for (let name in attributes) {
        if (name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, attributes[name])
        } else {
            object.setAttribute(name, attributes[name]);
        }
    }

    for (let child of children) {
        if (typeof child === 'string') {
            object.appendChild(new Text(child))
        } else {
            object.appendChild(child)
        }
    }
    return object;
}

function loadMore () {
    console.log('load more')
}
var c = <TabView style="width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column">
    <ScrollView tab-title="推荐" on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;overflow-x:hidden;background-color:lightblue;white-space:normal;font-size:50px">
        <Div className={'title'}>超多人收藏的店！</Div>
        <Div>345</Div>
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
    <ScrollView tab-title="有趣的店" style="background-color:pink"></ScrollView>
    <ScrollView tab-title="品牌新店" style="background-color:lightgreen"></ScrollView>
</TabView>
c.appendTo(document.body);
