import { ROOT_SYMBOL } from './component';

import Component from './component';

export default class Wrapper extends Component {
  /**
   * 对原生参数的一层包装，使其行为和自定义组件一致
   *
   * @param {*} type - 标签类型: div, span
   * @param {*} props - 属性参数
   * @memberof Wrapper
   */
  constructor(type, props) {
    super(props);
    this.type = type;
    this[ROOT_SYMBOL] = document.createElement(type);
  }

  getAttribute(name) {
    return this[ROOT_SYMBOL].getAttribute(name);
  }

  setAttribute(name, value) {
    if (name === 'className') {
      this[ROOT_SYMBOL].setAttribute('class', value);
    } else {
      this[ROOT_SYMBOL].setAttribute(name, value);
    }
  }

  addEventListener(type, listener) {
    this[ROOT_SYMBOL].addEventListener(...arguments);
  }

  removeEventListener(type, listener) {
    this[ROOT_SYMBOL].removeEventListener(...arguments);
  }
}
