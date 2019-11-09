import TextView from '../components/TextView.js';
import Wrapper from '../components/Wrapper.js';

// jsx的实现原理
export function create(Class, attributes, ...children) {
  let object;
  if (typeof Class === 'string') {
    object = new Wrapper(Class);
  } else {
    object = new Class();
  }
  for (let name in attributes) {
    if (name.match(/^on-([\s\S]+)$/)) {
      // console.log('scrollToBottom', RegExp.$1);
      object.addEventListener(RegExp.$1, attributes[name]);
    } else {
      // attribute
      object.setAttribute(name, attributes[name]);
    }
  }
  for (let child of children) {
    if (child instanceof Array) {
      for (let c of child) {
        if (typeof c === 'string') {
          object.appendChild(new TextView(c));
        } else {
          object.appendChild(c);
        }
      }
      // object.appendChild(new TextView(child));
    } else if (typeof child === 'object') {
      object.appendChild(child);
    } else {
      // 数组
      object.appendChild(new TextView(child.toString()));
    }
  }
  return object;
}