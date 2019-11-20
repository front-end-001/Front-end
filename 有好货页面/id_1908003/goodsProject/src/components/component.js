/**
 * 对象结构整理:
 * - cid 组件 ID
 * - name 组件名称
 * - $el 真实组件根元素
 * - $slot 插入点元素
 * - children 子组件
 * - events 事件监听集合
 * 
 * 生命周期整理: 参考 vue 什么周期设计
 * create: 组件创建, 拥有属性和 child 关联
 * mounted: 组件挂载
 * updated: 组件生命周期中重新调用 render 函数
 * destroy: 组件销毁, 主要销毁子组件和事件监听器
 * 
 * 默认事件整理:
 * mounted 组件挂载
 * destroyed 组件销毁
 * 
 * 重要方法:
 * $init 初始化
 * $render: 渲染函数
 * 
 * 其它模块:
 * - 属性校验模块: propTypes
 * - 属性变更监听模块: propWatchers
 * - 特殊属性处理模块:
 *   - ref 引用 todo:
 *   - classObj 支持对象模式 todo:
 *   - styleObj 支持对象模式 todo:
 *   - on-* 事件绑定属性
 */
import { deepClone, getRandomStr } from '../assets/utils';

export const PROP_SYMBOL = Symbol('property');
export const ATTR_SYMBOL = Symbol('attribute');
export const EVENT_SYMBOL = Symbol('event');
export const STATUS_SYMBOL = Symbol('status');

// on- 开头为事件绑定
const EventStart = 'on-';

/**
 * 属性值验证函数
 * @param {any} value 属性值
 * @param {any} condition 条件
 */
function validateProp(value, condition) {
  if (!condition || !Array.isArray(condition)) {
    return;
  }

  if (!Array.isArray(condition)) {
    return value instanceof condition;
  }

  let result = false;
  for (let i = 0; i < condition.length; i += 1) {
    if (value instanceof condition[i]) {
      result = true;
    }
  }
  return result;
}

export default class Component {
  /**
   * @param {object} attrs 属性对象
   */
  constructor(attrs, tagName = 'div') {
    this[PROP_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATUS_SYMBOL] = Object.create(null);
    this[ATTR_SYMBOL] = attrs;

    this[STATUS_SYMBOL].cid = getRandomStr();
    this[STATUS_SYMBOL].$el = null;
    this[STATUS_SYMBOL].children = [];
    this[STATUS_SYMBOL].$slots = Object.create(null);
    // 属性类型验证
    this.propTypes = {};
    // 属性变更监听
    this.propWatchers = {};
  }

  /** 组件实例id */
  get cid() {
    return this[STATUS_SYMBOL].cid;
  }
  /** 组件名称 */
  get name() {
    return this.constructor.name;
  }
  /** 获取子节点 */
  get children() {
    return this[STATUS_SYMBOL].children;
  }
  /** 获取组件真实的 dom 元素 */
  get $el() {
    return this[STATUS_SYMBOL].$el;
  }

  get $slot() {
    return this[STATUS_SYMBOL].$slots.default || this.$el;
  }

  set $slot(ele) {
    this[STATUS_SYMBOL].$slots.default = ele;
  }

  /** 生命周期方法*/
  create() {}
  mounted() {}
  updated() {}
  destroy() {}

  $init() {
    const attrs = this[ATTR_SYMBOL];
    let el;
    if (typeof this.create === 'function') {
      this.create();
    }

    for (const attrName in attrs) {
      this.$setProp(attrName, attrs[attrName]);
    }

    this.$render();
  }

  $render() {
    // todo: 重复渲染状态设计, 当前是强制重新构造 dom
    let newEl;
    if (typeof this.render === 'function') {
      newEl = this.render();
      if (newEl instanceof Component) {
        newEl = newEl.$el;
      }
    }
    if (!(newEl instanceof Element)) {
      throw new Error(`${this.name} Error: render() error, need return element`);
    }

    // 绑定事件
    const evtCollection = Object.entries(this[EVENT_SYMBOL]);
    evtCollection.forEach(([evtName, evtFucSet]) => {
      if (!evtFucSet) return;
      evtFucSet.forEach((evtFuc) => {
        newEl.addEventListener(evtName, evtFuc, false);
      });
    });

    // todo: 如果渲染也要走这里, 这样不行的呀
    // 绑定 Dom 通用属性
    // style class id title
    const commonAttr = ['id', 'class', 'style', 'title'];
    commonAttr.forEach((attrName) => {
      if (!this[PROP_SYMBOL][attrName]) {
        return;
      }
      if (attrName === 'class' && typeof this[PROP_SYMBOL][attrName] === 'string') {
        const calsses = this[PROP_SYMBOL][attrName].split(' ');
        calsses.forEach((item) => {
          if (!item) return;
          newEl.classList.add(item);
        });
        return;
      }
      newEl.setAttribute(attrName, this[PROP_SYMBOL][attrName]);
    });

    const currentEl = this[STATUS_SYMBOL].$el;

    if (currentEl && currentEl.parentNode) {
      currentEl.parentNode.replaceChild(newEl, currentEl);
      if (typeof this.updated === 'function') {
        this.updated();
      }
    }
    this[STATUS_SYMBOL].$el = newEl;
  }

  /** 渲染函数, 需要组件构造者重写 */
  render() {
    return document.createElement(this[STATUS_SYMBOL].tagName);
  }

  /** 自定义验证子节点 */
  validateChild(child) {
    return true;
  }

  /**
   * 挂载
   * appendChild 那存在问题, 挂载在具体哪个元素下
   * 因为具体组件结构
   */
  appendChild(child) {
    if (!child) return;

    let children = child;
    if (!Array.isArray(child)) {
      children = [child];
    }

    children.forEach(item => {
      if (!this.validateChild(item)) return;
      this[STATUS_SYMBOL].children.push(item);
    });

    // 还未初始化
    if (!this.$el) {
      return;
    }

    this.$render();

    // // 已初始化, 查找是否有默认插入点, 如果没有默认插入点就以根元素作为插入点
    // const slotEl = this.$slot;
    // if (typeof child === 'string') {
    //   slotEl.appendChild(document.createTextNode(child));
    // } else if (child instanceof Element) {
    //   slotEl.appendChild(child);
    // } else if (child.$el instanceof Element) {
    //   slotEl.appendChild(child.$el);

    //   // 触发生命周期
    //   if (typeof child.mounted === 'function') {
    //     child.mounted();
    //     child.triggerEvent('mounted', this);
    //   }
    // }
  }

  /** 另一种挂载方法 */
  appendTo(container) {
    if (!this.$el || !container) return;

    if (container instanceof Element) {
      container.appendChild(this.$el);
    } else if (container instanceof Element) {
      container.appendChild(this.$el);
    }

    if (typeof this.mounted === 'function') {
      this.mounted();
      this.triggerEvent('mounted', this);
    }
  }

  /** 移除元素 */
  remove() {
    // 移除元素需要递归查找所以子元素
    function doDestroy(ele) {
      if (ele.children) {
        for (let i = 0; i < ele.children.length; i += 1) {
          if (typeof ele.children[i].destroy === 'function') {
            ele.children[i].destroy();
          }
        }
      }
      if (typeof ele.destroy === 'function') {
        ele.destroy();
      }
    }
    doDestroy(this);
    this.$el.remove();
    this.triggerEvent('destroyed');

    // todo: 这里还需要父元素把本元素删除
  }

  removeChild(ele) {
    if (!ele) return;
    if (ele instanceof Element) {
      this.$el.removeChild(ele);
    } else if (ele.$el instanceof Element) {
      this[STATUS_SYMBOL].children = this[STATUS_SYMBOL].children.filter(child => (child !== ele));
      ele.remove();
    }
  }

  /**
   * 获取状态
   * @param {string} name 状态名
   */
  $getStatus(name) {
    if (name) {
      return this[STATUS_SYMBOL][name];
    }
    return deepClone(this[STATUS_SYMBOL]);
  }

  /**
   * 获取状态
   * @param {string} [name] 状态名
   */
  $getProp(name) {
    if (name) {
      return this[PROP_SYMBOL][name];
    }
    return deepClone(this[PROP_SYMBOL]);
  }

  /**
   * 设置属性
   * @param {string} name 属性名
   * @param {any} value 属性值
   */
  $setProp(name, value) {
    // 添加属性和绑定事件
    if (name.startsWith(EventStart)) {
      // todo: 添加多个事件如何处理
      // 验证, 只有函数才进行绑定
      if (typeof value === 'function') {
        const eventName = name.substring(EventStart.length);
        this.addEventListener(eventName, value);
      }
      return;
    }
    // 属性验证
    validateProp(value, this.propTypes[name]);
    const oldVal = this[PROP_SYMBOL][name];
    // 设置属性
    this[PROP_SYMBOL][name] = value;
    // 属性监听, 监听通过设置代理
    if (this.propWatchers[name] && typeof this.propWatchers[name] === 'function') {
      this.propWatchers[name](value, oldVal);
    }
  }

  /**
   * 添加事件监听
   * @param {string} type 事件名
   * @param {function} listener 执行函数
   */
  addEventListener(type, listener, option = false) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }

    if (this.$el) {
      this.$el.addEventListener(type, listener, option);
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

    if (this.$el) {
      this.$el.removeEventListener(type, listener);
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
