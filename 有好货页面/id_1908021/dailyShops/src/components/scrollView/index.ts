import BaseComponent from '../Base/BaseComponent';
import { createSpanElem } from '../_utils_/utils';

export default class ScrollView extends BaseComponent {
  constructor() {
    super();
    this.created();
  }

  created(): void {
    this.root = document.createElement('div');
    this.root.classList.add('scrollView');
    this.root.addEventListener(
      'touchmove',
      e => {
        e.cancelBubble = true;
        e.stopImmediatePropagation();
      },
      {
        passive: false
      }
    );
  }

  appendChild(child: any): any {
    if (!this.root) return;
    this.PROPERTY.children.push(child);
    if (child instanceof BaseComponent) {
      child.appendTo(this.root);
    } else if (typeof child === 'string') {
      this.root.appendChild(createSpanElem(child));
    } else {
      this.root.appendChild(child);
    }

    return child;
  }
}
