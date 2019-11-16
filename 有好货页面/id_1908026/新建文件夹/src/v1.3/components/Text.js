const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Text {
  constructor(config) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this.text = config || "";

    this.created();
  }

  created() {
    this.root = document.createElement("span");
    this.root.innerText = this.text;
  }

  mounted() {}

  unmounted() {}

  update() {}

  appendTo(el) {
    el.appendChild(this.root);
    this.mounted();
  }

  appendChild(child) {
    this[PROPERTY_SYMBOL].children.push(child);
    child.appendTo(this._container);
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  getAttribute(name) {
    if (name === "style") {
      return this._container.getAttribute("style");
    }
    if (name === "class") {
      return this._root.getAttribute("class");
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
    if (name === "style") {
      this._container.setAttribute("style", value);
    }
    if (name === "class") {
      this._container.setAttribute("class", value);
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
