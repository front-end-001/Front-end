import BaseComponent from '../Base/BaseComponent';

class TabHeader extends BaseComponent {
  constructor() {
    super();
    this.created();
  }

  created(): void {
    this.root = document.createElement('div');
    this.root.classList.add('tab-header');
  }

  appendChild(child: HTMLSpanElement): HTMLSpanElement {
    if (this.root) {
      if (this.PROPERTY.children.length === 0) {
        child.classList.add('tab-header-item-enabled');
      }
      this.root.appendChild(child);
      this.PROPERTY.children.push(child);
    }
    return child;
  }
}

export default TabHeader;
