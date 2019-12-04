/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 16:12:01
 * @LastEditTime: 2019-09-19 16:55:45
 * @LastEditors: Please set LastEditors
 */
import "./tab.css";
import baseClass from "../../baseClass";

class Tab extends baseClass {
  constructor() {
    super();
    this.created();
    this.children = [];
  }
  created() {
    this.root = document.createElement("div");
    this.header = document.createElement("div");
    this.header.classList.add("tab_header");
    this.content = document.createElement("div");
    this.content.classList.add("tab_content");
    this.root.appendChild(this.header);
    this.root.appendChild(this.content);
  }

  appendChilds(child) {
    let headerItem = document.createElement("div");
    headerItem.innerText = child.getAttribute("label");
    headerItem.classList.add('headerItem')

    this.children.push({ header: headerItem, content: child });

    this.header.appendChild(headerItem);
    this.content.appendChild(child.root);

    headerItem.addEventListener("click", e => {
      for (let i of this.children) {
        if (i.content.getAttribute("name") === child.getAttribute("name")) {
          i.content.setAttribute("style", "display:block;");
          i.header.classList.add("active");
        } else {
          i.content.setAttribute("style", "display:none;");
          i.header.classList.remove("active");
        }
      }
    });

    if (super.getAttribute("active") === child.getAttribute("name")) {
      child.setAttribute("style", "display:block;");
      headerItem.classList.add("active");
    } else {
      child.setAttribute("style", "display:none;");
    }
  }
}

export default Tab;
