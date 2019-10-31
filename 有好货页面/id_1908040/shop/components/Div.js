import {
    Component,
    PROPERTY_SYMBOL
} from './Component.js';

export default class Div extends Component {
  constructor() {
    super();
    this.created();
  }
  created() {
    this[PROPERTY_SYMBOL].root = document.createElement('div');
  }
}
