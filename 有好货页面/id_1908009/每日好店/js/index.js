import Tab from '../commponents/Tab.js';
import Scroll from '../commponents/Scroll.js';
import Head from '../commponents/Head.js'
import Text from '../commponents/Text.js'
function myCreate(Class, attributs, ...children) {
    var object = new Class()
    for (let name in attributs)
        object.setAttribute(name, attributs[name]);

    for (let child of children){
        if (typeof child === "string") {
            object.appendChild(new Text(child));
        }else{
            object.appendChild(child)
        }
    }
    return object
}

let app = document.getElementById('app')
var haed = <Head>
    {/* <img src='http://static001.geekbang.org/univer/classes/js_dev/static/icon/back.svg'/>
    <p>每日好店</p>
    <img src='http://static001.geekbang.org/univer/classes/js_dev/static/icon/share.svg' />
    <img src='http://static001.geekbang.org/univer/classes/js_dev/static/icon/more.svg'/> */}
</Head>

var tab = <Tab style='width:100%;height:calc(100% - 0.5rem);'>
    <Scroll tab-title='推荐' style='background:green'>
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
    </Scroll>
    <Scroll tab-title='有趣的店' style='background:gray'></Scroll>
    <Scroll tab-title='品牌新店' style='background:red'></Scroll>
</Tab>
//app.appendChild(head)
tab.appendTo(app)

//haed