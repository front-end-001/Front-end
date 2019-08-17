/** 深度克隆 */
export function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}
