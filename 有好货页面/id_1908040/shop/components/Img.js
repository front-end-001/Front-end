import {
  Component,
  PROPERTY_SYMBOL,
  ATTRIBUTE_SYMBOL
} from './Component.js';

export default class Img extends Component {
  constructor() {
    super();
    this.created();
  }
  created() {
    this[PROPERTY_SYMBOL].root = document.createElement('img');
  }
  setAttribute(name, value) {
    // hook
    if (name === 'style') {
      this[PROPERTY_SYMBOL].root.setAttribute('style', value);
    }
    if (name === 'src') {
      this[PROPERTY_SYMBOL].root.src = value;
    }
    if (name === 'class') {
      this[PROPERTY_SYMBOL].root.classList.add(value);
    }
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }
}
