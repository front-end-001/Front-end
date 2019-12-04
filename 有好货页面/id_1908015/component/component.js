export default class Component {
  constructor() {
    this.property = Object.create(null);
    this.event = Object.create(null);
    this.state = Object.create(null);

    this.property.children = [];
    this.root = document.createElement('div')
  }

  appendChild(child) {
    this.property.children.push(child);
    if (typeof child === 'string') {
      this.root.textContent = child;
      return
    }

    console.log('x: ', child, child.appendTo, this.root);
    child.appendTo(this.root)
  }

  appendTo(c) {
    c.appendChild(this.root)
  }
}
