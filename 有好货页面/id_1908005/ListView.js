import myCreate from "./myCreate";
import Div from "./Div.js";

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class ScrollView {
  constructor(data) {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL].children = [];

    this.created();
  }

  appendTo(element) {
    element.appendChild(this.root);
    this.mounted();
  }

  created() {
    this.root = document.createElement("div");
    this.render().appendTo(this.root);
  }
  mounted() {
  }
  unmounted() {}
  update() {}

  appendChild(child) {
    this.children.push(child);
    child.appendTo(this.root);
  }
  render(){
      let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
      return <div>
          hello
          { 
              data.map(item => (
                  <div><span class="x">{item.a}</span><span class="x">{item.b}</span></div>
              ))
          }
      </div>
  }

  get style(){
      return this.root.style;
  }
  get children() {
    return this[PROPERTY_SYMBOL].children;
  }
  getAttribute(name) {
    if (name == "style") {
      return this.root.getAttribute("style");
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    if (name == "style") {
      this.root.setAttribute("style", value);
    }
    if (name == "class") {
      this.root.setAttribute("class", value);
    }
    if (name == "key") {
      this.root.setAttribute("key", value);
    }
    if (name == "active") {
      this.root.setAttribute("active", value);
    }
    if (name == "data") {
      this[ATTRIBUTE_SYMBOL][name] = value;

      this.root.innerHTML = "";
      this.render().appendTo(this.root);

      return value;
    }
    this.root.style.overflow = "auto";
    this.root.style.whiteSpace = "normal";
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set();
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) return;
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    if (!this[EVENT_SYMBOL][type]) return;
    for (let event of this[EVENT_SYMBOL][type]) event.call(this);
  }
}
