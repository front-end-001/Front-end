/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 10:27:24
 * @LastEditTime: 2019-09-07 20:15:03
 * @LastEditors: Please set LastEditors
 */

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Carousel {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
  }

  appendTo(ele) {
    this.created();
    ele.appendChild(this.root);
  }

  created() {
    this.root = document.createElement("div");
    console.log(this[ATTRIBUTE_SYMBOL]);
    this.root.style.width = `${this[ATTRIBUTE_SYMBOL].width}px`;
    this.root.style.height = `${this[ATTRIBUTE_SYMBOL].height}px`;
    this[STATE_SYMBOL].h = 0;
    this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 100%, 50%)`;
  }
  mounted() {
    this.root.addEventListener("click", () => {
      this[STATE_SYMBOL].h += 60;
      this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
    });
  }
  unmounted() {}
  update() {}

  get width() {
    return this[PROPERTY_SYMBOL].width;
  }
  set width(value) {
    return (this[PROPERTY_SYMBOL].width = value);
  }

  get height() {
    return this[PROPERTY_SYMBOL].height;
  }
  set height(value) {
    return (this[PROPERTY_SYMBOL].height = value);
  }

  get data() {
    return this[PROPERTY_SYMBOL].data;
  }

  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }

  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }
  rmoveEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      return;
    }
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    for (let event of this[EVENT_SYMBOL][type]) {
      event.call(this);
    }
  }
}
