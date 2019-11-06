const ATTRIBUTE_SYMBOL = Symbol('attribute');
const PROPERTY_SYMBOL = Symbol('property');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

class Component {
  constructor(config) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    Object.assign(this[PROPERTY_SYMBOL], config);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
    this.created();
  }

  appendTo(container) {
    this.root = container;
    this.mounted();
  }

  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name]
  }

  setAttribute(name, value) {
    this[ATTRIBUTE_SYMBOL][name] = value;
    return value;
  }

  addEventListener(type, listener) {
    if (this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type].add(listener);
    } else {
      this[EVENT_SYMBOL][type] = new Set();
      this[EVENT_SYMBOL][type].add(listener);
    }
  }

  removeEventListener(type, listener) {
    if (this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type].delete(listener);
    } else {
      throw Error('error');
    }
  }

  triggerEvent(type) {
    if (this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type].forEach(event => event.call(this))
    } else {
      throw Error('error');
    }
  }
  // lifecycle
  created() {
  }

  mounted() {
  }

  unmounted() {
  }

  updated() {
  }

}
