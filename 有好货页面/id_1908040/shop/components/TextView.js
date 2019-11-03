import { Component, PROPERTY_SYMBOL } from './Component.js';

class TextView extends Component {
  constructor(config) {
    super();

    this.text = config || '';
    this.created();
  }
  created() {
    this[PROPERTY_SYMBOL].root = document.createElement('span');
    this[PROPERTY_SYMBOL].root.innerText = this.text;
  }
}

export default TextView;
