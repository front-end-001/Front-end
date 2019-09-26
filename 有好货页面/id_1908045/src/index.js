import TabView from './components/TabView'
import ScrollView from './components/ScrollView'
import Text from './components/Text'
import './style/style.less'


function myCreate(Class, Attributes, ...children) {
    let object = new Class()
    for (let name in Attributes) {
        if(name.match(/^on-([\s\S]+)$/)){
            object.addEventListener(RegExp.$1, Attributes[name])
        }else{
            object.setAttribute(name, Attributes[name])
        }
    }
    for (let child of children) {
        if (typeof child === 'string') {
            object.appendChild(new Text(child))
        } else {
            object.appendChild(child)
        }
    }
    return object
}

function loadMore(e){
    console.log(e)
    this.setAttribute('placeHolderText','加载中，请稍后...')
    setTimeout(()=>{
        this.setAttribute('placeHolderText','没有更多了')
    },1000)
}

function refresh(cb){
    setTimeout(()=>{
        cb()
    },1000)
}

let tab = <TabView style="width: 100%; height: 100%">
    <ScrollView tab-title="推荐" on-scrollToBottom={loadMore} placeHolderText='加载中，请稍后' on-refresh={refresh} style="background: lightpink">
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
        abc abc abc abc abc abc abc abc abc abc
    </ScrollView>
    <ScrollView tab-title="有趣的店" style="background: lightgreen"></ScrollView>
    <ScrollView tab-title="品牌新店" style="background: lightblue"></ScrollView>
</TabView>

tab.appendTo(document.body)