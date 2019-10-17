import Component from './component'
import Warper from './Wraper';

// todo: 构造基础元素构造函数, 已抹平基础元素和组件元素的差异

export default function myCreate(creater, attrs, ...children) {
  if (!creater) return '';

  let ele;
  if (typeof creater === 'string') {
    ele = new Warper(attrs, creater);
  } else {
    ele = new creater(attrs);
  }
  // console.log('构造组件', creater, attrs, children);

  for (let child of children) {
    if (Array.isArray(child)) {
      child.forEach((subChild) => {
        ele.appendChild(subChild);
      });
    } else {
      ele.appendChild(child);
    }
  }

  ele.$init();

  return ele;
}
