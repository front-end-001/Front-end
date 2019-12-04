const ATTRIBUTE_SYMBOL = Symbol('attribute');
const PROPERTY_SYMBOL = Symbol('property');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export class Component {
  constructor(config) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
    this.created();
  }

  appendTo(container) {
    container.appendChild(container);
    this.mounted();
  }

  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name]
  }

  setAttribute(name, value) {
    console.log(name, value)
    if (name === 'data') {
      console.log(value)
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
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
    console.log('created')
  }

  mounted() {
  }

  unmounted() {
  }

  updated() {
  }

}