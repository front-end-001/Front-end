const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class Component {
  constructor() {
    this[PROPERTY_SYMBOL] = Object.create(null)
    this[ATTRIBUTE_SYMBOL] = Object.create(null)
    this[EVENT_SYMBOL] = Object.create(null)
    this[STATE_SYMBOL] = Object.create(null)

    this.property.children = [];
    this.root = document.createElement('div')
  }

  appendChild(child) {
    this.children.push(child);

    // if (typeof child === 'string') {
    //   this.root.textContent = child;
    //   return
    // }
    child.appendTo(this.root)
  }

  appendTo(ele) {
    ele.appendChild(this.root)
  }

  get children(){
    return this[PROPERTY_SYMBOL].children;
  }

  addEventListener(type, listener) {
    if(!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set
    }
    this[EVENT_SYMBOL][type].add(listener)
  }

  removeEventListener(type, listener) {
    if(!this[EVENT_SYMBOL][type]) {
      throw new Error(`no such event ${type}`)
    }
    this[EVENT_SYMBOL][type].delete(listener)
  }

  triggerEvent(type, ...args) {
    if(!this[EVENT_SYMBOL][type]) return;
    this[EVENT_SYMBOL][type].forEach(event => {
      event.call(this, ...args);
    })
  }

  get property() {
    return this[PROPERTY_SYMBOL]
  }

  set property(value) {
    this.property = value
  }

  get attrs() {
    return this[ATTRIBUTE_SYMBOL]
  }

  setAttribute(name, value) {
    if (name == 'className') {
      this.root.className = value
    }
    return this.attrs[name] = value
  }

  getAttribute(name) {
    if(name == 'className'){
      return this.root.className
    }
    return this.attrs[name]
  }

  get events() {
    return this[EVENT_SYMBOL]
  }

  get state() {
    return this[STATE_SYMBOL]
  }
}
