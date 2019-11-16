(() => {
  const createElement = (type, props, ...children) => {
    if (props === null) props = {};
    return { type, props, children };
  };

  const setAttribute = (dom, key, value) => {
    if (typeof value === 'function' && key.startsWith('on')) {
      const eventType = key.slice(2).toLowerCase();
      dom.__JReactHandlers = dom.__JReactHandlers || {};
      dom.removeEventListener(eventType, dom.__JReactHandlers[eventType]);
      dom.__JReactHandlers[eventType] = value;
      dom.addEventListener(eventType, dom.__JReactHandlers[eventType]);
    } else if (key === 'checked' || key === 'value' || key === 'className') {
      dom[key] = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(dom.style, value);
    } else if (key === 'ref' && typeof value === 'function') {
      value(dom);
    } else if (key === 'key') {
      dom.__JReactKey = value;
    } else if (typeof value !== 'object' && typeof value !== 'function') {
      dom.setAttribute(key, value);
    }
  };

  // 将 vdom 转化成 dom
  const _render = (vdom, parent = null) => {
    // custom component 经过 babel 转义 然后 React.createElement 返回的 vdom.type 类型是 function
    // <p id="label">title</p> vdom = { type: 'p', props: {id: 'label'}, children: ['title']}
    const mount = parent ? (el => parent.appendChild(el)) : (el => el);
    if (typeof vdom === 'string' || typeof vdom === 'number') {
      return mount(document.createTextNode(vdom));
    } if (typeof vdom === 'boolean' || vdom === null) {
      return mount(document.createTextNode(''));
    } if (typeof vdom === 'object' && typeof vdom.type === 'function') {
      return Component.render(vdom, parent);
    } if (typeof vdom === 'object' && typeof vdom.type === 'string') {
      const dom = mount(document.createElement(vdom.type));
      for (const child of [].concat(...vdom.children)) _render(child, dom);
      for (const prop in vdom.props) {
        if (Object.prototype.hasOwnProperty.call(vdom.props, prop)) {
          setAttribute(dom, prop, vdom.props[prop]);
        }
      }
      return dom;
    }
    throw new Error(`Invalid VDOM: ${vdom}.`);
  };

  const _patch = (dom, vdom, parent = dom.parentNode) => {
    const replace = parent ? el => (parent.replaceChild(el, dom) && el) : (el => el);
    // 1. vdom 是自定义组件的时候
    // 2. vdom 是基本类型时 比较一下 dom
    // 3. vdom 是 object dom 是文本时 直接替换
    // 4. vdom 类型和 dom 节点名称不一致时 直接替换
    // 5. 递归遍历子节点 递归调用 _patch(domChild, vdomChild)
    if (typeof vdom === 'object' && typeof vdom.type === 'function') {
      return Component.patch(dom, vdom, parent);
    } if (typeof vdom !== 'object' && dom instanceof Text) {
      return dom.textContent !== vdom ? replace(_render(vdom, parent)) : dom;
    } if (typeof vdom === 'object' && dom instanceof Text) {
      return replace(_render(vdom, parent));
    } if (typeof vdom === 'object' && dom.nodeName !== vdom.type.toUpperCase()) {
      return replace(_render(vdom, parent));
    } if (typeof vdom === 'object' && dom.nodeName === vdom.type.toUpperCase()) {
      const pool = {};
      const active = document.activeElement;
      [].concat(...dom.childNodes).map((child, index) => {
        const key = child.__JReactKey || `__index_${index}`;
        pool[key] = child;
      });
      [].concat(...vdom.children).map((child, index) => {
        const key = child.props && child.props.key || `__index_${index}`;
        dom.appendChild(pool[key] ? _patch(pool[key], child) : _render(child, dom));
        delete pool[key];
      });
      for (const key in pool) {
        if (Object.prototype.hasOwnProperty.call(pool, key)) {
          const instance = pool[key].__JReactInstance;
          if (instance) instance.componentWillUnmount();
          pool[key].remove();
        }
      }
      for (const attr of dom.attributes) dom.removeAttribute(attr.name);
      for (const prop in vdom.props) {
        if (Object.prototype.hasOwnProperty.call(vdom.props, prop)) {
          setAttribute(dom, prop, vdom.props[prop]);
        }
      }
      active.focus();
      return dom;
    }
  };

  class Component {
    constructor(props) {
      this.props = props || {};
      this.state = null;
    }

    // 类似 ReactDOM.render()
    static render(vdom, parent = null) {
      const props = Object.assign({}, vdom.props, { children: vdom.children });

      // 判断这个组件是函数组件还是类组件
      if (Object.prototype.isPrototypeOf.call(Component, vdom.type)) {
        const instance = new (vdom.type)(props);
        instance.componentWillMount();

        // 调用业务组件中的 render 方法
        instance.base = _render(instance.render(), parent);
        instance.base.__JReactInstance = instance;

        // key 的作用
        instance.base.__JReactKey = vdom.props.key;
        instance.componentDidMount();
        return instance.base;
      }
      return _render(vdom.type(props), parent);
    }

    static patch(dom, vdom, parent = dom.parentNode) {
      const props = Object.assign({}, vdom.props, { children: vdom.children });
      // dom 是类组件时 会调用类组件特有的生命周期方法
      if (dom.__JReactInstance && dom.__JReactInstance.constructor === vdom.type) {
        dom.__JReactInstance.componentWillReceiveProps(props);
        dom.__JReactInstance.props = props;
        return _patch(dom, dom.__JReactInstance.render(), parent);
      } if (Object.prototype.isPrototypeOf.call(Component, vdom.type)) {
        // 全新的组件，不是更新的组件
        const ndom = Component.render(vdom, parent);
        return parent ? (parent.replaceChild(ndom, dom) && ndom) : (ndom);
      } if (!Object.prototype.isPrototypeOf.call(Component, vdom.type)) {
        return _patch(dom, vdom.type(props), parent);
      }
      return null;
    }

    setState(next) {
      const compat = a => typeof this.state === 'object' && typeof a === 'object';
      if (this.base && this.shouldComponentUpdate(this.props, next)) {
        const prevState = this.state;
        this.componentWillUpdate(this.props, next);
        // 更新 state
        this.state = compat(next) ? Object.assign({}, this.state, next) : next;
        // 更新 dom (感觉这个实现方式操作 dom 也是很频繁)
        _patch(this.base, this.render());
        this.componentDidUpdate(this.props, prevState);
      } else {
        this.state = compat(next) ? Object.assign({}, this.state, next) : next;
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextProps !== this.props || nextState !== this.state;
    }

    componentWillReceiveProps(nextProps) {
      return undefined;
    }

    componentWillUpdate(nextProps, nextState) {
      return undefined;
    }

    componentDidUpdate(prevProps, prevState) {
      return undefined;
    }

    componentWillMount() {
      return undefined;
    }

    componentDidMount() {
      return undefined;
    }

    componentWillUnmount() {
      return undefined;
    }
  }

  if (typeof module !== 'undefined') module.exports = { createElement, render: _render, Component };
  if (typeof module === 'undefined') window.JReact = { createElement, render: _render, Component };
})();