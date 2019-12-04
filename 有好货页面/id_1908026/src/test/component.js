function append(o, child) {
  o.appendChild(
    child instanceof DocumentFragment || child instanceof HTMLElement
      ? child
      : document.createTextNode(toString(child)),
  );
}

function toString(val) {
  return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

function isComponent(child) {
  return child instanceof Component;
}

export default class Component {
  /**
   * 自定义组件的基础类
   *
   * @param {*} props - 属性参数
   * @memberof Component
   */
  constructor(props) {
    this.attribute = Object.create(null);
    this.event = Object.create(null);
    this.props = props;
    this.root = document.createDocumentFragment();
  }

  render() {
    return this.props.children;
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
    // 获取组件父节点的引用
    this._parentNode = parent;
    // 临时挂载组件到 root 节点
    this.appendChild(this.render());
    // 获取组件所有子节点的引用
    this._childNode = Array.prototype.slice.call(this.root.children).map(child => child);

    // 挂载到父元素
    el.appendChild(this.root);

    requestAnimationFrame(this.mounted.bind(this));
  }

  appendChild(child) {
    if (!Array.isArray(child)) {
      child = [child];
    }
    this.root.appendChild(this._list(child));
  }

  _list(c) {
    const o = document.createDocumentFragment();
    for (const child of c) {
      if (Array.isArray(child)) {
        o.appendChild(this._list(child));
      } else {
        if (isComponent(child)) {
          child.appendTo(o, this.root);
        } else {
          append(o, child);
        }
      }
    }
    return o;
  }

  mounted() {}

  get children() {
    return this.props.children;
  }

  getAttribute(name) {
    return this.attribute[name];
  }

  setAttribute(name, value) {
    this.attribute[name] = value;
  }

  addEventListener(type, listener) {
    if (!this.event[type]) {
      this.event[type] = new Set();
    }
    this.event[type].add(listener);
  }

  removeEventListener(type, listener) {
    if (!this.event[type]) return;
    this.event[type].delete(listener);
  }

  dispatchEvent(type) {
    if (!this.event[type]) return;
    for (const event of this.event[type]) {
      event.call(this, ...Array.from(arguments).slice(1));
    }
  }
}
