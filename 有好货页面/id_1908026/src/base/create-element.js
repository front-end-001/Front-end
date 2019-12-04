import Wrapper from './wrapper';

export function createElement(target, props, ...children) {
  props = Object.assign({}, props);
  if (children !== null) {
    props.children = children;
  }

  // 处理原生标签和自定义组件
  const o = typeof target === 'string' ? new Wrapper(target, props) : new target(props);

  // 处理属性和事件
  for (const name in props) {
    if (name === 'children') continue;
    if (typeof props[name] === 'function' && name.match(/^on([\s\S]+)$/)) {
      /**
       *  TODO: 需要过滤event
       */
      o.addEventListener(RegExp.$1.toLowerCase(), props[name]);
    } else {
      /**
       *  TODO: 需要过滤attribute
       */
      o.setAttribute(name, props[name]);
    }
  }
  return o; // 需要vdom這裡返回vnode
}
