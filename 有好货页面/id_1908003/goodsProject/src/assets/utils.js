/**
 * 获取元素的 translateX 值
 * @param {Element} el 元素
 * @returns {number}
 */
export function getTransformXVal(el) {
  let trasVal = window
    .getComputedStyle(el)
    .getPropertyValue('transform');
  const mat = trasVal.match(/^matrix\((.+)\)$/);
  return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
}

/**
 * 深度克隆
 * @param {object} obj 对象
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
