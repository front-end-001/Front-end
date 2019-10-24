import Text from './Components/Text';
import Wrapper from './TabComponent/Wrapper';

// react 也差不多做了相同的事情
export function create(Component, attributes, ...children) {
  let cmp;
  if (typeof Component === 'string') {
    cmp = new Wrapper(Component);
  } else {
    cmp = new Component();
  }

  for (let name in attributes) {
    if (name.match(/^on-([\s\S]+)$/)) {
      cmp.addEventListener(RegExp.$1, attributes[name]);
    } else {
      cmp.setAttribute(name, attributes[name]);
    }
  }
  for (let child of children) {
    if (child instanceof Array) {
      for (let c of child) {
        if (typeof c === 'string') {
          cmp.appendChild(new Text(c));
        } else {
          cmp.appendChild(c);
        }
      }
    } else if (typeof child === 'object') {
      cmp.appendChild(child);
    } else {
      cmp.appendChild(new Text(child.toString()));
    }
  }
  return cmp;
}