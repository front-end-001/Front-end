import Component from './component'

export default function myCreate(creater, attrs, ...children) {
  if (!creater) return '';
  console.log(creater, attrs, children);
  if (typeof creater === 'string') {
    const ele = document.createElement(creater);
    if (attrs) {
      for (const attrName in attrs) {
        ele.setAttribute(attrName, attrs[attrName]);
      }
    }
    for (const child of children) {
      const appendChild = (child) => {
        if (typeof child === 'string') {
          ele.appendChild(document.createTextNode(child));
        } else if (child instanceof Element) {
          ele.appendChild(child);
        } else if (child instanceof Component) {
          // ele.appendChild(child.$root);
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
  return new creater(attrs, children);
}
