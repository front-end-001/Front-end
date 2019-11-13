import { Text } from './Text';
import { Wrapper } from './Wrapper';
import flatten from '_array-flatten@2.1.2@array-flatten';
export function h(component, props, ...children) {
  let instance = null;
  if (typeof component === 'string') {
    instance = new Wrapper(component);
  } else {
    instance = new component;
  }
  instance.created();
  for (let [name, val] of Object.entries(props || {})) {
    if (/^on-([\s\S]+)/.exec(name)) {
      instance.addEventListener(RegExp.$1, val);
    } else {
      instance.setAttribute(name, val);
    }
  }
  for (let child of flatten(children || [])) {
    if (['string', 'number'].indexOf(typeof (child)) > -1) {
      child = new Text(child);
    }
    instance.appendChild(child);
  }
  return instance;
}
export const ATTR_SYMBOL = Symbol('attr');
export const PROP_SYMBOL = Symbol('prop');// ？ 定义
export const STATE_SYMBOL = Symbol('state');
export const EVENT_SYMBOL = Symbol('event');
export class BaseComponent {
  constructor() {
    this[STATE_SYMBOL] = Object.create(null);
    this[ATTR_SYMBOL] = Object.create(null);
    this[PROP_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[PROP_SYMBOL].children = [];
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
    if (name === 'class') {
      for (let _val of val.split(/\s+/).filter(s => s !== '')) {
        this.root.classList.add(_val);
      }
      return val;
    }
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
  appendChild(child) {
    this[PROP_SYMBOL].children.push(child);
    child.mount(this.root);
  }
}
/*
 constructor,created 执行顺序调整：先 constructor ，再 created
 ? appendChild 与 mount
*/