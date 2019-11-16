import { PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL, EVENT_SYMBOL, STATE_SYMBOL } from '../until/Symbol'

export default class Wrapper {
  constructor(type) {
    this[PROPERTY_SYMBOL] = Object.create(null);//避免找原型链上的同名方法
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this.children=[]
    this.node=document.createElement(type)
  }

  appendTo(el) {
    el.appendChild(this.node);
    this.children.forEach(child => {
      child.appendTo(this.node)
      // child.parent = this
    })
    this.mounted();
  }
  mounted() {
    
  }
  appendChild(child) {
    if (Array.isArray(child)) {
      this.children = child
    } else {
      this.children.push(child)
    }
    console.log(child,'child')

  }
  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name]
  }
  setAttribute(name, value) {
    if (name === "className") {
      this.node.classList.add(value)
    }
    if (name === "style") {
      this.node.style = value
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type])
      this[EVENT_SYMBOL][type] = new Set;
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type])
      return;
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type,...arg) {
    if (!this[EVENT_SYMBOL][type])
      return;
    for (let event of this[EVENT_SYMBOL][type])
      event.call(this,arg);
  }
}