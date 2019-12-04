import {
  Component,
  PROPERTY_SYMBOL,
  ATTRIBUTE_SYMBOL
} from './Component.js';

export default class A extends Component {
  constructor() {
    super();
    this.created();
  }
  created() {
    this[PROPERTY_SYMBOL].root = document.createElement('a');
    this[PROPERTY_SYMBOL].root.style.textDecoration = 'none';

    this[PROPERTY_SYMBOL].root.addEventListener('click', () => {
      location.href = this[PROPERTY_SYMBOL].href;
    })
  }
  setAttribute(name, value) {
    // hook
    if (name === 'style') {
      this[PROPERTY_SYMBOL].root.setAttribute('style', value);
    }
    if (name === 'class') {
      this[PROPERTY_SYMBOL].root.classList.add(value);
    }
    if (name === 'href') {
      this[PROPERTY_SYMBOL].href = value;
    }
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }
}
