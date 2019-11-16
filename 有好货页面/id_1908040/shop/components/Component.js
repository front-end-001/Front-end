const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

/**
 * @file Component 组件基类
 */
class Component {
  constructor() {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL].root = null;
    this[PROPERTY_SYMBOL].children = [];
    this.created();
  }
  appendTo(element) {
    element.appendChild(this[PROPERTY_SYMBOL].root);
    this.mounted();
  }
  appendChild(child) {
    this.children.push(child);
    child.appendTo(this[PROPERTY_SYMBOL].root);
  }
  created() {}
  mounted() {}
  unmount() {}
  update() {}
  get children() {
    return this[PROPERTY_SYMBOL].children;
  }
  get style() {
    return this[PROPERTY_SYMBOL].root.style;
  }
  getAttribute(name) {
    if (name === 'style') {
      return this[PROPERTY_SYMBOL].root.getAttribute('style');
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    // hook
    if (name === 'style') {
      this[PROPERTY_SYMBOL].root.setAttribute('style', value);
    }
    if (name === 'placeHolderText') {
      this[PROPERTY_SYMBOL].placeHolder.innerText = value;
    }
    if (name === 'class') {
      this[PROPERTY_SYMBOL].root.classList.add(value);
    }
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      return;
    }
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type, ...args) {
    if (!this[EVENT_SYMBOL][type]) {
      return;
    }
    for (let event of this[EVENT_SYMBOL][type]) {
      // event.call(this);
      // ...args 传参数
      event.call(this, ...args);
    }
  }
}

export {
  Component,
  PROPERTY_SYMBOL,
  ATTRIBUTE_SYMBOL,
  EVENT_SYMBOL,
  STATE_SYMBOL
};