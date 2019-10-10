const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Div {
  constructor(type) {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
    this.type = type
    this[PROPERTY_SYMBOL].children = [];

    this.created();
  }

  appendTo(element) {
    element.appendChild(this.root);
    this.mounted();
  }

  created() {
    // this.root = document.createElement("div");
    this.root = document.createElement(this.type);
  }
  mounted() {}
  unmounted() {}
  update() {}

  appendChild(child) {

    this.children.push(child);
    child.appendTo(this.root);
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }
  getAttribute(name) {
    if (name === "style") {
        this.root.setAttribute(name);
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    if(name === "style") {
        this.root.setAttribute(name, value);
    }
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }
  addEventListener(type, listener) {
    this.root.addEventListener(...arguments)
  }
  removeEventListener(type, listener) {
    this.root.removeEventListener(...arguments);
  }
}
