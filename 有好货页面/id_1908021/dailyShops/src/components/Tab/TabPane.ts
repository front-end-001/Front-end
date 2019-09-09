import BaseComponent from '../Base/BaseComponent';

class TabPane extends BaseComponent {
  constructor() {
    super();
    this.created();
  }

  created(): void {
    this.root = document.createElement('div');
    this.root.classList.add('tab-pane');
  }

  appendChild(child: BaseComponent): BaseComponent {
    if (this.root) {
      child.appendTo(this.root);
      this.PROPERTY.children.push(child);
    }
    return child;
  }
}

export default TabPane;
