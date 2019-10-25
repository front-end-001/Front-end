import { BaseComponent } from "./component";

export class Text extends BaseComponent {
  created() {
    this.root = document.createElement('p');
  }
  appendChildren(children) {
    this.root.innerText = children.join('');
  }
}