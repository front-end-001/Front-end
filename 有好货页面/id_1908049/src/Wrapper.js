import { Text as TextComponent } from "./Text";

export class Wrapper {
  constructor(tag) {
    this.el = document.createElement(tag)
  }
  created() { }
  addEventListener() {
    this.el.addEventListener(...arguments);
  }
  setAttribute() {
    this.el.setAttribute(...arguments);
  }
  appendChild(child) {
    //？ 查看文字节点其他实现
    if (child instanceof TextComponent) {
      this.el.appendChild(new Text(child.text));
    } else {
      child.appendTo(this.el);
    }
  }
  appendTo(el) {
    el.appendChild(this.el);
  }
}
/**
 * 代理html 标签
 */