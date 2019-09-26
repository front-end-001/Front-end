import Text from "./Text";
import Component from "./Component";
import Fragment from "MyCreate/Fragment";

const MyCreate = (Class, attr, ...children) => {
  let component = null
  if(typeof Class === "string" && Class[0].toLowerCase() === Class[0]) {
    // 首字母小写，是 dom 元素
    component = new Component({tagName: Class, ...attr})
  } else {
    component = new Class({...attr})
  }

  for(let name in attr) {
    let finalName = name
    if(name === 'className') finalName = 'class'
    component.setAttribute(finalName, attr[name]);
  }

  for(let child of children) {
    if(typeof child === 'string') {
      child = new Text({children: child})
    }
    if(child instanceof Array) {
      // 接受一个数组
      child = new Fragment({children: child})
    }
    component.appendChild(child);
  }

  return component;
};

export default MyCreate