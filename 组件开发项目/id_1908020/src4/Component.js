const PROPERTY_SYMBOL = Symbol("property"); //名字跟注释差不多，为了调试方便
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Carousel {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);//避免找原型链上的同名方法
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this.created();
  }

  // log() {
  //   console.log("width:", this.width);
  // }

  appendTo(element) {
    //element.appendChild(this.root);
    this.mounted();
  }

  created() {
    // this.root = document.createElement("div");
    // this[STATE_SYMBOL].h = 0;
    // this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 100%, 50%)`;
    // console.log(this)
  }
  mounted() {
    // this.root.addEventListener("click", () => {
    //   this[STATE_SYMBOL].h += 60;
    //   this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
    // })
  }
  unmounted() {

  }
  update() {

  }

  // get width() {
  //   return this[PROPERTY_SYMBOL].width;
  // }
  // set width(value) {
  //   this.root.style.width = `${value}px`;
  //   this.root.style.height = `${value}px`;
  //   return this[PROPERTY_SYMBOL].width = value; //返回结果 和c系语言保持一致
  // }
  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name]
  }
  setAttribute(name, value) {
    // if (name == "width") {
    //   this.width = value;
    //   //this.triggerEvent("widthchange");
    // }
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
    for (let event of this[EVENT_SYMBOL][type])
      event.call(this);
  }
}