import { create } from '../create';
import Div from './Div';
import css from './ListView.css';

// 要认真写 symbol 的名字，跟注释差不多的作用
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');


// if (!window.LIST_VIEW_STYLE_ELEMENT) {
// let styleElement = document.createElement('style');
// styleElement.innerHTML = css;
// styleElement.setAttribute('scoped', '');
// document.getElementsByTagName('head')[0].appendChild(styleElement);
// window.LIST_VIEW_STYLE_ELEMENT = true;
// }


export default class ListView {
  // 属性要在 constructor 里面写
  constructor() {
    // 存 attribute 和 property 一定要用纯净的对象
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];

    this.created();
  }

  appendTo(element) {
    element.appendChild(this.root);
    this.mounted();
  }

  appendChild(child) {
    this.children.push(child);
    child.appendTo(this.root);
    this.root.appendChild(this.placeHolder);
  }

  // 生命周期
  created() {
    this.root = document.createElement('div');
    this.root.className = "list-view";
    // this.root.innerText = '112312312312'
    // let element = <Div><Div>text</Div>abc</Div>;
    // let element = <div><div>text</div>abc<img src='https://www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super' /></div>;
    // element.appendTo(this.root);
    this.render().appendTo(this.root);
    // this.addStyle();
  }

  mounted() { }

  render() {
    // return <div><div>text</div>abc<img src='https://www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super' /></div>;
    let data = this[ATTRIBUTE_SYMBOL]['data'] || [];
    return (
      <div>
        hello
        {
          data.map(item => (
            <div><span style={css.x}>{item.name}</span></div>
          ))
        }
      </div>
    )
  }

  // addStyle() {
  //   this.styleElement = document.createElement('style');
  //   console.log(css);
  //   this.styleElement.innerHTML = css;
  //   this.styleElement.setAttribute('scoped', '');
  //   this.root.appendChild(this.styleElement);
  // }

  get style() {
    return this.root.style;
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  getAttriute(name) {
    if (name === 'style') {
      return this.root.getAttribute('style');
    }
    // if (name === 'class') {
    //   return this.root.getAttribute('class');
    // }
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    if (name === 'style') {
      this.root.setAttribute('style', value);
    }
    // if (name === 'class') {
    //   this.root.setAttribute('class', value);
    // }
    if (name === 'data') {
      this[ATTRIBUTE_SYMBOL][name] = value;
      this.root.innerHTML = '';
      this.render().appendTo(this.root);
      // this.addStyle();
      return value;
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }

  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventLister(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      throw new Error('no such event')
    }
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type, ...args) {
    if (!this[EVENT_SYMBOL][type])
      return;
    for (let event of this[EVENT_SYMBOL][type])
      event.call(this, ...args);
  }
}