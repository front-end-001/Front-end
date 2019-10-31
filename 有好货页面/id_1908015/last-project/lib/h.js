import Wrapper from '../component/wrapper'
import TextView from '../component/text-view'

// render 函数
export function h(_class, attributes, ...children){
  let object = null;
  if (typeof _class == 'string') {
    object = new Wrapper(_class)
  } else {
    object = new _class()
  }

  for(let prop in attributes){
    // 事件
    if(prop.match(/^on-([\s\S]+)$/)) {
      object.addEventListener(RegExp.$1, attributes[prop])
    } else {
      // 属性
      object.setAttribute(prop, attributes[prop]);
    }
  }

  for(let child of children) {
    if (child instanceof Array) {
      for (let item of child) {
        if (typeof item == 'string') {
          // Text 对象
          object.appendChild(new Text(item))
        } else {
          object.appendChild(item)
        }
      }
    } else if (typeof child == "object") {
      object.appendChild(child)
    } else {
      object.appendChild(new TextView(child.toString()))
    }
  }
  return object
}
