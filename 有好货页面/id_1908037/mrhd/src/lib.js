// import Component from './component.js'
import Tab from './tab.js'
import Div from './Div.js'
//myCreate整个不用变，webpack打包时与jsx结合，将下面代码，按格式处理成js
function myCreate(Class, attributes, ...children) {
    // https://react.docschina.org/docs/jsx-in-depth.html
    // 对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
//     前面以及说过了，JSX 是 React.createElement(component, props, …children) 提供的语法糖，component 的类型是：string/ReactClass type，我们具体看一下在什么情况下会用到 string 类型，什么情况下用到 ReactClass type 类型

// string 类型react会觉得他是一个原生dom节点
// ReactClass type 类型 自定义组件
{/* <MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
会编译为：

React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
) */}
    let object = new Class();
    // console.log(arguments);
    // const array = Array.from(attributes)
// 循环添加属性
    for(let name in attributes) {
        object.setAttribute(name, attributes[name]);
    }
// 循环添加子
    for (let child of children) {
        object.appendChild(child);
    }
    return object;
}

// let a = <Component width="100"></Component>
//定义一个整体tab控件，包含tab和子控件容器div，并将整个控件添加到body下面
let a = <Tab style="height: 500px; width: 500px;">
    <Div tab-title="推荐" style="background-color: lightblue;"></Div>
    <Div tab-title="有趣的店" style="background-color: red;"></Div>
    <Div tab-title="品牌新店" style="background-color: yellow;"></Div>
   
</Tab>
a.appendTo(document.body);
//不能再用原生标签，要用就要包装一下，可以理解为必须自定义的组件
// let c=<div style="height: 50px; width: 500px;">
// <br></br>
// </div>
// c.appendTo(document.body);
let b = <Tab style="height: 500px; width: 500px;">
    <Div tab-title="哈哈哈" style="background-color: lightblue;">
    {/* <div style="height: 50px; width: 500px;">
        lkdfjgladjglk
 <br></br>
</div>  */}
    </Div>
    <Div tab-title="有趣的店" style="background-color: red;"></Div>
    <Div tab-title="品牌新店" style="background-color: yellow;"></Div>
   
</Tab>
b.appendTo(document.body);