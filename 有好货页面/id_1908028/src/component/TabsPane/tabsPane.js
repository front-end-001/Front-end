/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 16:44:14
 * @LastEditTime: 2019-09-19 16:52:08
 * @LastEditors: Please set LastEditors
 */
import "./tabsPane.css";
import baseClass from "../../baseClass";

class TabPane extends baseClass {
  constructor() {
    super();
    this.created();
  }
  created() {
    this.root = document.createElement("div");
    this.root.style.width = "100%";
    this.root.style.overflow = "scroll";
  }

  appendChilds(child) {
    this.root.appendChild(child.root);
  }
}

export default TabPane;
