const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
/* eslint-disable no-unused-vars */
export default class Wrapper {
  constructor(type) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];

    this._root = document.createElement(type);
  }

  appendTo(el) {
    el.appendChild(this._root);
  }

  appendChild(child) {
    this[PROPERTY_SYMBOL].children.push(child);
    child.appendTo(this._root);
  }

  appendString(string) {
    this._root.innerHTML += string;
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  getAttribute(name) {
    return this._root.getAttribute(name);
  }

  setAttribute(name, value) {
    this._root.setAttribute(name, value);
  }

  addEventListener(type, listener) {
    this._container.addEventListener(...arguments);
  }

  removeEventListener(type, listener) {
    this._container.removeEventListener(...arguments);
  }
}
