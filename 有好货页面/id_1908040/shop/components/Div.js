import {
    Component,
} from './Component.js';

export default class Div extends Component {
  constructor() {
    super();
    this.created();
  }
  created() {
    this.root = document.createElement('div');
  }
}
