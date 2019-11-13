import { BaseComponent } from "./component";

export class Text {
  constructor(text) {
    this.text = text;
    this.created();
  }
  created() {
    this.root = document.createElement('p');
    this.root.innerText = this.text;
  }
  mount(el) {
    el.appendChild(this.root);
  }
}
/**
 * ？Text组件与 Base组件
 * ? 循环引用报错
 */