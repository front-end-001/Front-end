import Component from './component';

export default class Wrapper extends Component {
  constructor(type, props) {
    super(props);
    this.type = type;
    this.root = document.createElement(type);
  }

  getAttribute(name) {
    return this.root.getAttribute(name);
  }

  setAttribute(name, value) {
    if (name === 'className') {
      this.root.setAttribute('class', value);
    } else {
      this.root.setAttribute(name, value);
    }
  }

  addEventListener(type, listener) {
    this.root.addEventListener(...arguments);
  }

  removeEventListener(type, listener) {
    this.root.removeEventListener(...arguments);
  }
}
