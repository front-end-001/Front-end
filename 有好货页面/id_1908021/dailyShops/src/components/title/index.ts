import BaseComponent from '../Base/BaseComponent';

// Title component supports level attribute values 1~6
// which will be translated into h1~6
const heads = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const defaultLevel = 1;

const CLASS_NAME = 'hbw-title';

class Title extends BaseComponent {
  constructor() {
    super();
    this.created();
  }

  created(): void {
    this.root = document.createElement('div');
    this.root.classList.add(CLASS_NAME);
    this.setAttribute('level', defaultLevel);
  }

  appendChild(child: any): any {
    if (this.root) {
      let innerNode = document.createElement(heads[this.ATTRIBUTE.level]);
      innerNode.innerText = child;
      this.PROPERTY.children.push(innerNode);
      this.root.appendChild(innerNode);
    }
    return child;
  }

  mounted(): void {
    if (!this.root) return;
  }
}

export default Title;
