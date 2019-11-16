export const PROPERTY_SYMBOL = Symbol("property");
export const ATTRIBUTE_SYMBOL = Symbol("attribute");
export const EVENT_SYMBOL = Symbol("event");

export default class Component {
  constructor(attr = {}) {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null)
    this[ATTRIBUTE_SYMBOL].children = attr.children || [];
    this[ATTRIBUTE_SYMBOL].tagName = attr.tagName;
    for (let propName of Object.getOwnPropertyNames(attr)) {
      if (propName === "props") {
        for (let propName in attr.props) {
          this[PROPERTY_SYMBOL][propName] = attr.props[propName];
        }
        break;
      }
      this[ATTRIBUTE_SYMBOL][propName] = attr[propName];
    }
    this.created();
  }

  get isDomComponent() {
    return Boolean(this[ATTRIBUTE_SYMBOL].tagName);
  }

  getAttribute(name) {
    if (this.isDomComponent) {
      return this.root.getAttribute(name);
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
    if (this.isDomComponent) {
      this.root.setAttribute(name, value);
    }
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }

  setEvent(name, eventHandler) {
    this.root.addEventListener(name, eventHandler);
    return this[EVENT_SYMBOL][name] = eventHandler;
  }

  getEvent(name) {
    return this[EVENT_SYMBOL][name];
  }

  setProperty(name, value) {
    return (this[PROPERTY_SYMBOL][name] = value);
  }

  getProperty(name) {
    return this[PROPERTY_SYMBOL][name];
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  created() {
    if (this[ATTRIBUTE_SYMBOL].tagName) {
      this.root = document.createElement(this[ATTRIBUTE_SYMBOL].tagName);
    } else {
      this.root = this.render().root;
    }
    if (this.componentDidMount) {
      setTimeout(() => {
        // 这里就是想搞成异步的，没想好怎么搞
        this.componentDidMount.apply(this);
      });
    }
  }

  appendTo(element) {
    element.appendChild(this.root);
  }

  appendChild(child) {
    // 添加一个子组件节点
    if (child) {
      child.appendTo(this.root);
    }
  }
}
