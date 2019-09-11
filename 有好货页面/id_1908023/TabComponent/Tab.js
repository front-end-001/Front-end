import './style.less';

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol("state");

class Tap {
  constructor() {
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
    this.headerContainer = document.createElement('div');
    this.contentContainer = document.createElement('div');
    this.headerContainer.className = 'tab-header-container';
    this.contentContainer.className = 'tab-content-container';

    this.root.appendChild(this.headerContainer);
    this.root.appendChild(this.contentContainer);
  }

  appendTo(element) {
    element.appendChild(this.root);
    this.mounted();
  }

  mounted() {}

  appendChild(child) {
    this.children.push(child);
    child.appendTo(this.contentContainer);
  }
  
  getAttriute(name) {
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
      // this[EVENT_SYMBOL][type] = [];
      this[EVENT_SYMBOL][type] = new Set();
    }
    // this[EVENT_SYMBOL][type].push(listener);
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

export default Tap;