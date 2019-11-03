/* eslint-disable no-unused-vars */
import { createComponent } from "../utils/createComponent";
import Div from "./Div";

const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class ListView {
  constructor(options) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];

    this.created();
  }

  created() {
    this._root = document.createElement("div");
    this._root.classList.add("m-list");

    // this.render().appendTo(this._root);
  }

  mounted() {}

  render() {
    const data = this[ATTRIBUTE_SYMBOL]["data"] || [];
    return (
      <div>
        {data.map(item => {
          return (
            <div>
              <span>{item.a}</span> - <span>{item.b}</span>
            </div>
          );
        })}
      </div>
    );
  }

  appendTo(el) {
    el.appendChild(this._root);
    this.mounted();
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
    if (name === "style") {
      return this._root.getAttribute("style");
    }
    if (name === "class") {
      return this._root.getAttribute("class");
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
    if (name === "style") {
      this._root.setAttribute("style", value);
    }
    if (name === "class") {
      this._root.setAttribute("class", value);
    }

    if (name === "data") {
      this[ATTRIBUTE_SYMBOL][name] = value;
      this._root.innerHTML = "";
      this.render().appendTo(this._root);

      return value;
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

  dispatchEvent(type, ...params) {
    if (!this[EVENT_SYMBOL][type]) return;
    for (const event of this[EVENT_SYMBOL][type]) {
      event.call(this, ...params);
    }
  }
}
