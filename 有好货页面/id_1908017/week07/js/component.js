export function h(component, props, ...children) {
  const instance = new component;
  for (let [name, val] of Object.entries(props || {})) {
    if (/^on-([\s\S]+)/.exec(name)) {
      instance.addEventListener(RegExp.$1, val);
    } else {
      instance.setAttribute(name, val);
    }
  }
  instance.appendChildren(children);
  return instance;
}
export const ATTR_SYMBOL = Symbol('attr');
export const PROP_SYMBOL = Symbol('prop');
export const STATE_SYMBOL = Symbol('state');
export const EVENT_SYMBOL = Symbol('event');
export class BaseComponent {
  constructor() {
    this[STATE_SYMBOL] = Object.create(null);
    this[ATTR_SYMBOL] = Object.create(null);
    this[PROP_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this.created();
  }
  created() {
    this.root = document.createElement('div');
  }
  mount(el) {
    el.append(this.root);
    this.mounted();
  }
  mounted() {

  }
  setAttribute(name, val) {
    return this[ATTR_SYMBOL][name] = val;
  }
  getAttribute(name) {
    return this[ATTR_SYMBOL][name];
  }
  addEventListener(eventName, listener) {
    const eventMap = this[EVENT_SYMBOL];
    if (!eventMap[eventName]) {
      eventMap[eventName] = new Set();
    }
    eventMap[eventName].add(listener);
    return () => eventMap[eventName].remove(listener);
  }
  triggerEvent(eventName, args) {
    const eventMap = this[EVENT_SYMBOL];
    if (eventMap[eventName]) {
      for (let listener of eventMap[eventName]) {
        listener.call(this, args);
      }
    }
  }

  appendChildren(children) {
    for (let child of children) {
      child.mount(this.root);
    }
  }
}