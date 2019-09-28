import Component from './component'

// todo: 构造基础元素构造函数, 已抹平基础元素和组件元素的差异

export default function myCreate(creater, attrs, ...children) {
  if (!creater) return '';
  if (typeof creater === 'string') {
    // console.log('构造元素', creater, attrs, children);
    const ele = document.createElement(creater);
    if (attrs) {
      for (const attrName in attrs) {
        // on- 开头为事件绑定
        const EventStart = 'on-';
        if (attrName.startsWith(EventStart)) {
          const eventName = attrName.substring(EventStart.length);
          ele.addEventListener(eventName, attrs[attrName]);
        } else {
          ele.setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    for (const child of children) {
      const appendChild = (child) => {
        if (typeof child === 'string') {
          ele.appendChild(document.createTextNode(child));
        } else if (child instanceof Element) {
          ele.appendChild(child);
        } else if (child instanceof Component) {
          child.appendTo(ele);
        }
      }

      if (Array.isArray(child)) {
        child.forEach((subChild) => {
          appendChild(subChild);
        });
      } else {
        appendChild(child);
      }
    }
    return ele;
  }
  // console.log('构造组件', creater, attrs, children);
  return new creater(attrs, children);
}
