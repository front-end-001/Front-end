import TabView from "./teacher/tabview.js";
import Div from "./container.js";
import ScrollView from './teacher/scrollview.js';
import Text from './text.js';

function myCreate(Class, attributes, ...children) {
    // console.log(children);
    let object = new Class();
    for (let name in attributes) {
        if(name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, attributes[name]);
        } else{
            object.setAttribute(name, attributes[name]);
        }

    }
    for (let child of children) {
        if (typeof child === "string") {
            object.appendChild(new Text(child));
        } else {
            object.appendChild(child);
        }
    }

    return object;
}

/*
* 禁用系统的scroll
* */
function loadMore() {
    setTimeout(()=>{

        this.setAttribute('placeHolderText', 'No more');
        console.log('end', Date.now())
    },5000);
}

var c = <TabView style="width:100%;height:100%;">
    <ScrollView tab-title="推荐" placeHolderText="load more" on-scrolltobottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
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
    <ScrollView tab-title="有趣的店"  style="background-color:lightgreen;font-size:50px">
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
        dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf     dbf dbf dbf  dbf dbf dbf
        dbf dbf dbf dbf dbf dbf
    </ScrollView>
    <ScrollView tab-title="品牌新店" style="background-color:pink;font-size:50px">
        hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
        hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig     hig hig hig  hig hig hig
        hig hig hig hig hig hig
    </ScrollView>
</TabView>;
c.appendTo(document.body);