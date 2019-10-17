// import Carousel from './js/Carousel.js'
 import TabView from './js/TabView.js'
 import ScrollView from './js/ScrollView.js'
 import Text from './js/Text.js'
 import Div from './js/Div.js'
import { type } from 'os';

function myCreate(Class, attributes,...children){
    
     console.log(children);

    var object = new Class();
    for(let name in attributes){
        object.setAttribute(name, attributes[name]);// 设置 attribute
        // object[name] = attributes[name];// 设置property

    }
    for(let child of children) {
        if(typeof child === "string"){
            object.appendChild(new Text(child));
        }else{
            object.appendChild(child);

        }
    }
    // console.log(children)  打印子对象 for in 遍历对象的属性（普通对象） for of 遍历数组的孩子 （集合型的对象）

    return object;

}
// var t = <Text>abc</Text>


var c = <TabView style="width:100%;height:100% ">

<ScrollView tab-title="推荐" style="-webkit-overflow-scrolling:touch; overflow:scroll; background-color:red;white-space:normal;font-size:36px">
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad

    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
    asddad asddad asddad asddad asddad
</ScrollView>
<ScrollView tab-title="有趣的店" style="background-color:green">
youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu

    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu

    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youquyouqu youqu youqu
    youqu youqu youquyouqu youqu youqu
    youqu youqu youquyouqu youqu youqu
    youqu youqu youquyouqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu

    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu

    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youqu
    youqu youqu youquyouqu youqu youqu
    youqu youqu youquyouqu youqu youqu
    youqu youqu youquyouqu youqu youqu
    youqu youqu youquyouqu youqu youqu
    youqu youqu youqu
</ScrollView>
<ScrollView tab-title="品牌新店" style="background-color:yellow"></ScrollView>

</TabView>
c.appendTo(document.body)