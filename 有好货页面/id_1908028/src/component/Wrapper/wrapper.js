/*
 * @Author: your name
 * @Date: 2019-10-31 14:23:39
 * @LastEditTime: 2019-10-31 14:25:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \everyDay\src\component\Wrapper\wrapper.js
 */
import baseClass from "../../baseClass";

class Wrapper extends baseClass {
  constructor(tagName) {
    super();
    this.created(tagName);
  }

  created(tagName) {
    this.root = document.createElement(tagName);
  }
}

export default Wrapper;
