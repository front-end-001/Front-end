const PROPERTY_SYMBOL = Symbol("property"); //名字跟注释差不多，为了调试方便
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Img {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);//避免找原型链上的同名方法
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this.created();
  }

  appendTo(element) {
    element.appendChild(this._root);
    this.mounted();
  }

  created() {
    this._root = document.createElement("img");
  }
  mounted() {
    // 生命周期不对
    // this._root.addEventListener("srcChange", () => {
    //   this._root.src=this.src
    // })
  }
  unmounted() {

  }
  update() {

  }
  srcChange() {

  }
  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name]
  }
  setAttribute(name, value) {
    if (name == "src") {
      this._root.src = value
      this.triggerEvent("srcChange");
    }

    return this[ATTRIBUTE_SYMBOL][name] = value;
  }
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type])
      this[EVENT_SYMBOL][type] = new Set;
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type])
      return;
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    if (!this[EVENT_SYMBOL][type])
      return;
    for (let event of this[EVENT_SYMBOL][type])
      event.call(this);
  }
}