/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 16:03:49
 * @LastEditTime: 2019-09-19 16:11:11
 * @LastEditors: Please set LastEditors
 */
import "./title.css";
import baseClass from "../../baseClass";

class Title extends baseClass {
  constructor() {
    super();
    this.created();
  }

  created() {
    this.root = document.createElement("div");
  }
}

export default Title;
