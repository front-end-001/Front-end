const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol("state");

export default class TapView {
  constructor(config) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];
    this[PROPERTY_SYMBOL].headers = [];

    this.created();
  }

  created() {
    this.root = document.createElement('div');
    this.root.style.display = "flex";
    this.headerContainer = document.createElement('div');
    this.contentContainer = document.createElement('div');
    this.contentContainer.style.whiteSpace = "nowrap";
    this.contentContainer.style.overflow = "hidden";
    this.contentContainer.style.flex = "1";
    this.headerContainer.style.height = "93px";
    // this.headerContainer.className = 'tab-header-container';
    // this.contentContainer.className = 'tab-content-container';

    this.root.appendChild(this.headerContainer);
    this.root.appendChild(this.contentContainer);
  }

  appendTo(element) {
    element.appendChild(this.root);
    this.mounted();
  }

  mounted() { }

  appendChild(child) {
    this.children.push(child);

    let title = child.getAttribute('tab-title') || '';
    this[PROPERTY_SYMBOL].headers.push(title);
    
    let header = document.createElement('div');
    header.innerText = title;
    header.style.display = 'inline-block';
    header.style.height = '93px';
    header.style.fontSize = '46px';
    header.style.fontFamily = 'PingFang SC';
    header.style.margin = '20px 35px 0 35px';
    this.headerContainer.appendChild(header);
    child.appendTo(this.contentContainer);

    for (let i = 0; i < this.contentContainer.children.length; i++) {
      this.contentContainer.children[i].style.width = '100%';
      this.contentContainer.children[i].style.height = '100%';
      this.contentContainer.children[i].style.display = 'inline-block';
    }
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  getAttribute(name) {
    if (name === 'style') {
      return this.root.getAttribute('style');
    }
    if (name === 'class') {
      return this.root.getAttribute('class');
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    if (name === 'style') {
      this.root.setAttribute('style', value);
      this.root.style.display = 'flex';
      this.root.style.flexDirection = 'column';
    }
    if (name === 'class') {
      this.root.setAttribute('class', value);
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  addEventListener(type, listener) {
    // 创建一个容器来存放事件
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventLister(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      throw new Error('no such event')
    }
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    for (let event of this[EVENT_SYMBOL][type]) {
      event.call(this, type);
    }
  }
}
