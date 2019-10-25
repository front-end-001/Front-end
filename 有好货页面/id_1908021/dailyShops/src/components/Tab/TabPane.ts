import BaseComponent from '../Base/BaseComponent';

export default class TabPane extends BaseComponent {
  constructor() {
    super();
    this.created();
  }

  created(): void {
    this.root = document.createElement('div');
    this.root.classList.add('tab-pane');
  }

  appendChild(child: BaseComponent | string): BaseComponent | string {
    if (this.root) {
      if (typeof child === 'string') {
        const childNode = document.createTextNode(child);
        this.root.appendChild(childNode);
      } else {
        child.appendTo(this.root);
      }
      this.PROPERTY.children.push(child);
    }
    return child;
  }
}
