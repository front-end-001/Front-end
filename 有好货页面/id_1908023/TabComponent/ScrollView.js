// 要认真写 symbol 的名字，跟注释差不多的作用
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class ScrollView {
  // 属性要在 constructor 里面写
  constructor() {
    // 存 attribute 和 property 一定要用纯净的对象
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];

    this.created();
  }

  appendTo(element) {
    element.appendChild(this.root);
    this.mounted();
  }

  appendChild(child) {
    this.children.push(child);
    child.appendTo(this.root);
    this.root.appendChild(this.placeHolder);
  }

  // 生命周期
  created() {
    this.root = document.createElement('div');
    this.placeHolder = document.createElement('div');
    this.placeHolder.style.backgroundColor = 'lightgreen';
    this.root.appendChild(this.placeHolder);

    let triggered = false;

    this.root.addEventListener('scroll', event => {
      let clientRect = this.root.getBoundingClientRect();
      let placeHolderRect = this.placeHolder.getBoundingClientRect();
      if (clientRect.bottom < placeHolderRect.top) {
        if (triggered) {
          this.triggerEvent("scrolToBottom");
          triggered = true;
        }
      }
    })
  }

  get style() {
    return this.root.style;
  }

  mounted() { }

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
    }
    if (name === 'class') {
      this.root.setAttribute('class', value);
    }
    if (name === 'placeHolderText') {
      this.placeHolder.innerText = value;
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }

  addEventListener(type, listener) {
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
  triggerEvent(type, ...args) {
    if (!this[EVENT_SYMBOL][type])
      return;

    for (let event of this[EVENT_SYMBOL][type]) {
      event.call(this, ...args);
    }
  }
}
