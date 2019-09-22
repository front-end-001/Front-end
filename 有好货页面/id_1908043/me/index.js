import TabView from './TabView'
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

// var t = <Text>abc</Text>
// t.appendTo(document.body)

// var c = <TabView style="width:100%;height:100%">
//     <ScrollView tab-title="推荐" style="background-color:lightblue;"></ScrollView>
//     <ScrollView tab-title="有趣的店" style="background-color:lightgreen;"></ScrollView>
//     <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
// </TabView>

// c.appendTo(document.body)

// test

var d = <TabView style="width:100%;height:100%;">
    <ScrollView tab-title="推荐" style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc     abc abc abc  abc abc abc
     abc abc abc abc abc abc
    </ScrollView>
    <ScrollView tab-title="有趣的店"  style="background-color:lightgreen;"></ScrollView>
    <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
</TabView>
d.appendTo(document.body);




