import BaseComponent from '../Base/BaseComponent';

const active_CLASS = 'tab-header-item-active';

export default class TabHeader extends BaseComponent {
  constructor() {
    super();
    this.created();
  }

  created(): void {
    this.root = document.createElement('div');
    this.root.classList.add('tab-header');
    this.STATE.active = 0;
  }

  set active(value: number) {
    this.STATE.active = value;
    this.triggerEvent('activeIndexChange');
  }

  appendChild(child: HTMLSpanElement): HTMLSpanElement {
    if (this.root) {
      if (this.PROPERTY.children.length === 0) {
        child.classList.add(active_CLASS);
      }
      this.root.appendChild(child);
      this.PROPERTY.children.push(child);
    }
    return child;
  }

  activeIndexChange() {
    const children = this.PROPERTY.children as HTMLSpanElement[];
    children.forEach((child, index) => {
      if (index === this.STATE.active) {
        child.classList.add(active_CLASS);
      } else {
        child.classList.remove(active_CLASS);
      }
    });
  }

  mounted() {
    this.addEventListener('activeIndexChange', this.activeIndexChange);
  }
}
