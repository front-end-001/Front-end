import { deepClone } from '../assets/utils';

export const PROP_SYMBOL = Symbol('property');
export const ATTR_SYMBOL = Symbol('attribute');
export const EVENT_SYMBOL = Symbol('event');
export const STATUS_SYMBOL = Symbol('status');

export default class Component {
  /**
   * @param {object} attrs 属性对象
   * @param {array} children 子元素
   */
  constructor(attrs, children) {
    this[ATTR_SYMBOL] = Object.create(null);
    this[PROP_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATUS_SYMBOL] = Object.create(null);

    this[STATUS_SYMBOL].children = [];
    this[STATUS_SYMBOL].root = null;

    this.init(attrs, children);
  }

  init(attrs, children) {
    this[STATUS_SYMBOL].children = children;

   let root;
    if (typeof this.create === 'function') {
      root = this.create();
    }
    this.triggerEvent('created');

    if (!(root instanceof Element)) {
      throw new Error('created need return element');
    }
    
    this[STATUS_SYMBOL].root = root;

    for(const attrName in attrs) {
      this.setAttr(attrName, attrs[attrName]);
    }
  }

  /** 挂载 */
  appendTo(container) {
    const { root } = this[STATUS_SYMBOL];
    if (!root) return;

    container.appendChild(root);
    if (typeof this.mounted === 'function') {
      this.mounted(root);
    }
    this.triggerEvent('mounted', root);
  }

  /**
   * 默认构建方法
   * @return {Element} 组件根元素
   */
  create() {
    return document.createElement('div');
  }

  mounted(ele) {}

  /**
   * 属性修改拦截器
   * @param {string} type 属性名
   * @param {string} value 属性值
   */
  attrInterceptor(type, value) {}

  /**
   * 属性修改拦截器
   * @param {string} type 属性名
   * @param {string} value 属性值
   */
  propInterceptor(type, value) {}

  /**
   * 属性修改拦截器
   * @param {string} type 属性名
   * @param {string} value 属性值
   */
  statusInterceptor(type, value) {}

  /**
   * 获取状态
   * @param {string} name 状态名
   */
  getStatus(name) {
    return this[STATUS_SYMBOL][name];
  }

  /**
   * 返回全部状态
   */
  getAllStatus() {
    return deepClone(this[STATUS_SYMBOL]);
  }

  /**
   * 设置状态
   * @param {string} name 状态名
   * @param {any} value 状态值
   */
  setStatus(name, value) {
    if (typeof this.attrInterceptor === 'function') {
      this.statusInterceptor(name, value);
    }
    this[STATUS_SYMBOL][name] = value;
  }

  /**
   * 获取状态
   * @param {string} name 状态名
   */
  getProp(name) {
    return this[PROP_SYMBOL][name];
  }

  /** 返回全部属性 */
  getAllProp() {
    return deepClone(this[PROP_SYMBOL]);
  }

  /**
   * 设置属性
   * @param {string} name 属性名
   * @param {any} value 属性值
   */
  setProp(name, value) {
    if (typeof this.attrInterceptor === 'function') {
      this.propInterceptor(name, value);
    }
    this[PROP_SYMBOL][name] = value;
  }

  /**
   * 获取属性
   * @param {string} name 属性名
   */
  getAttr(name) {
    return this[ATTR_SYMBOL][name];
  }

  /**
   * 返回全部属性
   */
  getAllAttr() {
    return deepClone(this[ATTR_SYMBOL]);
  }

  /**
   * 设置属性
   * @param {string} name 属性名
   * @param {string} value 属性值
   */
  setAttr(name, value) {
    if (typeof this.attrInterceptor === 'function') {
      this.attrInterceptor(name, value);
    }
    this[ATTR_SYMBOL][name] = value;
  }

  appendChild(child) {
    this[STATUS_SYMBOL].children.push(child);
    if (child instanceof Component) {
      child.appendTo(this.$root);
    } else {
      this.$root.appendChild(child);
    }
  }

  get children() {
    return this[STATUS_SYMBOL].children;
  }

  get $root() {
    return this[STATUS_SYMBOL].root;
  }

  /**
   * 添加事件监听
   * @param {string} type 事件名
   * @param {function} listener 执行函数
   */
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }

    this[EVENT_SYMBOL][type].add(listener);
  }

  /**
   * 移除事件监听
   * @param {string} type 事件名
   * @param {function} listener 执行函数
   */
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      return;
    }
    this[EVENT_SYMBOL][type].delete(listener);
  }

  /**
   * 发出事件
   * @param {string} type 触发事件类型
   * @param {any} value 事件数据
   */
  triggerEvent(type, value = null) {
    if (!this[EVENT_SYMBOL][type]) return;

    this[EVENT_SYMBOL][type].forEach((callback) => {
      callback.call(this, value);
    });
  }
};

