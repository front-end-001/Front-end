import { BaseComponent, ATTR_SYMBOL, STATE_SYMBOL } from "./component";

export class Tab extends BaseComponent {
  created() {
    this[STATE_SYMBOL].pos = null;
    this.root = document.createElement('div');
    this.headers = document.createElement('div');
    this.root.appendChild(this.headers);
    this.contents = document.createElement('div');
    this.root.appendChild(this.contents);
  }
  appendChildren(children) {
    for (let child of children) {
      const header = document.createElement('div');
      header.innerText = child[ATTR_SYMBOL]['tab-title'];
      this.headers.appendChild(header);
      child.mount(this.contents);
    }
  }
  mounted() {
    const { headers } = this;
    for (let i = 0; i < headers.children.length; i++) {
      headers.children[i].addEventListener('click', () => {
        this.setState_pos(i);
      });
    }
    this.setState_pos(0);
  }
  setState_pos(pos) {
    const lastPos = this[STATE_SYMBOL].pos;
    if (!Number.isInteger(lastPos)) {
      for (let content of this.contents.children) {
        content.style.display = 'none';
      }
    } else {
      this.contents.children[lastPos].style.display = 'none';
    }
    this.contents.children[pos].style.display = '';
    this[STATE_SYMBOL].pos = pos;
  }
}