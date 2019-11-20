// import { PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL, EVENT_SYMBOL, STATE_SYMBOL } from '../until/Symbol'

const PROPERTY_SYMBOL = Symbol("property"); //名字跟注释差不多，为了调试方便
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
export default class Div {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);//避免找原型链上的同名方法
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this.created();
    this.children = []
  }

  created() {
    this.node = document.createElement("div");
    console.log(this.getAttribute('className'),'created')
  }
  mounted() {
    console.log(this.getAttribute('className'),'mounted')
    this.node.addEventListener('click',e=>{
      this.triggerEvent('click',e)
    })
  }

  update() {

  }
  appendTo(el) {
    el.appendChild(this.node);
    this.children.forEach(child => {
      child.appendTo(this.node)
      // child.parent = this
    })
    this.mounted();
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