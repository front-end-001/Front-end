const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Div {
  constructor(options) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];

    this.created();
  }

  created() {
    this._container = document.createElement("div");
  }

  mounted() {}

  unmounted() {}

  update() {}

  appendTo(el) {
    el.appendChild(this._container);
    this.mounted();
  }

  appendChild(child) {
    this[PROPERTY_SYMBOL].children.push(child);
    child.appendTo(this._container);
  }

  appendString(string) {
    this._root.innerHTML += string;
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  getAttribute(name) {
    if (name === "style") {
      return this._container.getAttribute("style");
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
    if (name === "style") {
      this._container.setAttribute("style", value);
    }
    this[ATTRIBUTE_SYMBOL][name] = value;
  }

  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }

  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) return;
    this[EVENT_SYMBOL][type].delete(listener);
  }

  dispatchEvent(type) {
    if (!this[EVENT_SYMBOL][type]) return;
    for (const event of this[EVENT_SYMBOL][type]) {
      event.call(this);
    }
  }
}
