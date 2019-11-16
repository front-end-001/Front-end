import { append } from './utils';
import { cloneChildren, isComponent } from './common';

// 组件的私有属性
export const PROPERTY_SYMBOL = Symbol('property');
export const ATTRIBUTE_SYMBOL = Symbol('attribute');
export const EVENT_SYMBOL = Symbol('event');
export const STATE_SYMBOL = Symbol('state');
export const ROOT_SYMBOL = Symbol('root');
// 组件的私有方法
export const PRIVATE_METHOD_UPDATE = Symbol('update');
export const PRIVATE_METHOD_LIST = Symbol('list');
export const PRIVATE_METHOD_PROXY_PROPS = Symbol('proxyProps');

export default class Component {
  /**
   * 自定义组件的基础类
   *
   * @param {*} props - 属性参数
   * @memberof Component
   */
  constructor(props) {
    this[STATE_SYMBOL] = null; // 标记组件的状态, 不同状态触发不同生命周期函数
    this[PROPERTY_SYMBOL] = props; // 存储组件传入的参数属性, 包含 children
    this[ATTRIBUTE_SYMBOL] = Object.create(null); // 存储组件的属性
    this[EVENT_SYMBOL] = Object.create(null); // 存储组件的所有自定义事件
    this[ROOT_SYMBOL] = document.createDocumentFragment(); // 组件的根节点
    this[PRIVATE_METHOD_PROXY_PROPS](); // 执行代理函数
    this._mounted = false;
  }

  /**
   * 使用 props 代理 PROPERTY_SYMBOL
   */
  [PRIVATE_METHOD_PROXY_PROPS]() {
    this.props = new Proxy(this[PROPERTY_SYMBOL], {
      get: (obj, prop) => {
        // TODO: 克隆出来的 children 没有进行属性挂载
        // if (prop === 'children') {
        //   // 插槽可能存在多个，每个都是一个副本
        //   return cloneChildren(obj.children);
        // }
        return obj[prop];
      },
      set(target, p, value, receiver) {
        console.log('gengxinle');
      },
    });
  }

  render() {
    return this[PROPERTY_SYMBOL].children;
  }

  update() {
    const tempTree = this.render();
    const tempFragment = document.createDocumentFragment();
    tempFragment.appendChild(this[PRIVATE_METHOD_LIST]([tempTree]));
    console.log(tempFragment);
    const nextSibling = this._childNode[this._childNode.length - 1].nextSibling;
    const range = document.createRange();
    range.selectNode(this._childNode[0]);
    const startOffset = range.startOffset;
    range.selectNode(this._childNode[this._childNode.length - 1]);
    const endOffset = range.endOffset;
    range.setStart(this._parentNode, startOffset);
    range.setEnd(this._parentNode, endOffset);
    range.deleteContents();
    this._parentNode.insertBefore(tempFragment, nextSibling);

    // this._childNode.forEach(child => {
    //   this._parentNode.replaceChild(ccc,child)
    // })
  }

  [PRIVATE_METHOD_UPDATE]() {
    console.log('PRIVATE_METHOD_UPDATE');
  }

  /**
   * 主动挂载
   *
   * 目的 - 为了更方便触发生命周期钩子
   * @param {*} el - 临时Fragment
   * @param parent - 真实parentNode
   * @memberof Component
   */
  appendTo(el, parent) {
    // console.log('挂在元素', el);
    // 获取组件父节点的引用
    this._parentNode = parent;
    // 临时挂载组件到 root 节点
    this.appendChild(this.render());
    // 获取组件所有子节点的引用
    this._childNode = Array.prototype.slice.call(this[ROOT_SYMBOL].children).map(child => child);

    // 挂载到父元素
    el.appendChild(this[ROOT_SYMBOL]);

    if (this._mounted) {
      this.beforeUpdate();
      requestAnimationFrame(this.updated.bind(this));
    } else {
      this.beforeMount();
      // 执行声明周期函数 mounted
      requestAnimationFrame(this.mounted.bind(this));
      this._mounted = true;
    }
  }

  appendChild(child) {
    if (!Array.isArray(child)) {
      child = [child];
    }
    this[ROOT_SYMBOL].appendChild(this[PRIVATE_METHOD_LIST](child));
  }

  [PRIVATE_METHOD_LIST](c) {
    const o = document.createDocumentFragment();
    for (const child of c) {
      if (Array.isArray(child)) {
        o.appendChild(this[PRIVATE_METHOD_LIST](child));
      } else {
        if (isComponent(child)) {
          child.appendTo(o, this[ROOT_SYMBOL]);
        } else {
          append(o, child);
        }
      }
    }
    return o;
  }

  beforeMount() {}

  mounted() {}

  beforeUpdate() {}

  updated() {}

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  getAttribute(name) {
    if (name === 'style') {
      return this._container.getAttribute('style');
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
    this[ATTRIBUTE_SYMBOL][name] = value;
  }

  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }

  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) return;
    this[EVENT_SYMBOL][type].delete(listener);
  }

  dispatchEvent(type) {
    if (!this[EVENT_SYMBOL][type]) return;
    for (const event of this[EVENT_SYMBOL][type]) {
      event.call(this, ...Array.from(arguments).slice(1));
    }
  }
}
