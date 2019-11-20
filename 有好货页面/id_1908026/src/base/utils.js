/**
 * 向父结点添加子节点
 *
 * @export - append
 * @param {*} o - parentNode
 * @param {*} child - childNode<HTMLElement | Other>
 */
export function append(o, child) {
  o.appendChild(
    child instanceof DocumentFragment || child instanceof HTMLElement
      ? child
      : document.createTextNode(toString(child)), // toString, 自定义函数，目的是转为字符串
  );
}

/**
 * 转为字符串
 *
 * @export - toString
 * @param {*} val - 待转参数
 * @returns string 字符串结果
 */
export function toString(val) {
  return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
}
