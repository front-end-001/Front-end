import BaseComponent from '../Base/BaseComponent';

class ListView extends BaseComponent {
  constructor() {
    super();
    this.created();
  }

  created(): void {
    this.root = document.createElement('div');
    this.root.classList.add('listView');
    this.setAttribute('data', []);
  }

  appendChild(child: any): any {
    if (!this.root) return;
    this.PROPERTY.children.push(child);
    if (child instanceof BaseComponent) {
      child.appendTo(this.root);
    } else if (typeof child === 'string') {
      this.root.appendChild(document.createTextNode(child));
    } else {
      this.root.appendChild(child);
    }

    return child;
  }

  mounted(): void {
    if (!this.root) return;
  }

  setAttribute(name: string, value: any): any {
    super.setAttribute(name, value);
  }
}

export default ListView;
