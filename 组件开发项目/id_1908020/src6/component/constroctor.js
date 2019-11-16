

export default class Carousel {
  constructor(config) {
    this.PROPERTY_SYMBOL = Symbol("property"); //名字跟注释差不多，为了调试方便
    this.ATTRIBUTE_SYMBOL = Symbol("attribute");
    this.EVENT_SYMBOL = Symbol("event");
    this.STATE_SYMBOL = Symbol("state");
    this[this.PROPERTY_SYMBOL] = Object.create(null);//避免找原型链上的同名方法
    this[this.ATTRIBUTE_SYMBOL] = Object.create(null);
    this[this.EVENT_SYMBOL] = Object.create(null);
    this[this.STATE_SYMBOL] = Object.create(null);

    this.created();
  }

  getAttribute(name) {
    return this[this.ATTRIBUTE_SYMBOL][name]
  }

  addEventListener(type, listener) {
    if (!this[this.EVENT_SYMBOL][type])
      this[this.EVENT_SYMBOL][type] = new Set;
    this[this.EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener) {
    if (!this[this.EVENT_SYMBOL][type])
      return;
    this[this.EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    if (!this[this.EVENT_SYMBOL][type])
      return;
    for (let event of this[this.EVENT_SYMBOL][type])
      event.call(this);
  }
}