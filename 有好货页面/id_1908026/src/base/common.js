import Wrapper from './wrapper';
import Component from './component';

/**
 * 根据已有的props重新创建一个实例，供插槽使用
 *
 * @export
 * @param {*} c - props.children
 * @returns - Array<实例 || String>
 */
export function cloneChildren(c) {
  return c.map(child =>
    isComponent(child)
      ? child.constructor === Wrapper
        ? new child.constructor(child.type, child.props)
        : new child.constructor(child.props)
      : child,
  );
}

export function isComponent(child) {
  return child instanceof Component;
}
