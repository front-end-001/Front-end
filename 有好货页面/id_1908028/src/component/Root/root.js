/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 15:23:21
 * @LastEditTime: 2019-09-19 16:03:22
 * @LastEditors: Please set LastEditors
 */
import "./root.css";
import baseClass from "../../baseClass";

class Root extends baseClass {
  constructor() {
    super();
    this.created();
  }

  created() {
    this.root = document.createElement("div");
  }
}

export default Root;
