const PROPERTY_SYMBOL = Symbol("property"); //名字跟注释差不多，为了调试方便
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class TabPane {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);//避免找原型链上的同名方法
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this._child=[]
    this.created();
  }

  appendTo(element) {
    element.appendChild(this._root);
    this.mounted();
  }

  created() {
    this._root = document.createElement("div");
  }
  mounted() {
    this._child.forEach(child=>child.mounted())
    // 生命周期不对
    // this._root.addEventListener("srcChange", () => {
    //   this._root.src=this.src
    // })
  }
  unmounted() {

  }
  update() {

  }
  appendChild(child){
    console.log(child)
    if (!Array.isArray(child)) {
      this._child.push(child)
    }
    this._child.forEach(item => {
      item.appendTo(this._root)
    })
    
  }
  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name]
  }
  setAttribute(name, value) {
    if (name == "title") {
      this[ATTRIBUTE_SYMBOL].title=value
    }
    if (name == "className") {
      this._root.classList.add(value)
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