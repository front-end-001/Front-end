import Component, { PROP_SYMBOL, EVENT_SYMBOL, STATUS_SYMBOL } from './component';

// on- 开头为事件绑定
const EventStart = 'on-';

export default class Wraper extends Component {
  /**
   * @param {string} tagName 标签名
   * @param {object} attrs 属性对象
   */
  constructor(attrs, tagName) {
    super(attrs, tagName);
    this[STATUS_SYMBOL].tagName = tagName;

    this[STATUS_SYMBOL].$el = this.render();
    this[STATUS_SYMBOL].$slots.default = this[STATUS_SYMBOL].$el;
  }

  /** 组件名称 */
  get name() {
    return this[STATUS_SYMBOL].tagName;
  }

  /** 渲染函数 */
  render() {
    const ele = document.createElement(this.name);
    const props = this[PROP_SYMBOL];
    for (let name in props) {
      ele.setAttribute(name, props[name]);
    }
    return ele;
  }

  $render() {
    // 绑定事件
    const evtCollection = Object.entries(this[EVENT_SYMBOL]);
    evtCollection.forEach(([evtName, evtFucSet]) => {
      if (!evtFucSet) return;
      evtFucSet.forEach((evtFuc) => {
        this.$el.addEventListener(evtName, evtFuc, false);
      });
    });
  }

  /**
   * 挂载
   * appendChild 那存在问题, 挂载在具体哪个元素下
   * 因为具体组件结构
   */
  appendChild(child) {
    const slotEl = this.$slot;
    if (!slotEl || !child) return;

    if (typeof child === 'string') {
      slotEl.appendChild(document.createTextNode(child));
    } else if (child instanceof Element) {
      slotEl.appendChild(child);
    } else if (child.$el instanceof Element) {
      slotEl.appendChild(child.$el);

      // 触发生命周期
      if (typeof child.mounted === 'function') {
        child.mounted();
        child.triggerEvent('mounted', child);
      }
    }
  }

  /**
   * 设置属性
   * @param {string} name 属性名
   * @param {any} value 属性值
   */
  $setProp(name, value) {
    // 添加属性和绑定事件
    if (name.startsWith(EventStart)) {
      // 验证, 只有函数才进行绑定
      if (typeof value === 'function') {
        const eventName = name.substring(EventStart.length);
        this.addEventListener(eventName, value);
      }
      return;
    }
    if (name === 'styleObj') {
      for (let name in value) {
        this.$el.style[(name)] = value[name];
        // this.$el.style[camelize(name)] = value[name];
      }
      return;
    }
    // 设置属性
    this[PROP_SYMBOL][name] = value;

    if (this.$el instanceof Element) {
      this.$el.setAttribute(name, value);
    }
  }

};

function camelize(str) {
  return (str + "").replace(/-\D/g,
  function(match) {
      return match.charAt(1).toUpperCase();
  });
}
