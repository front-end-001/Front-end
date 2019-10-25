/**
 * @file ScrollView组件
 */
import {
    Component,
    PROPERTY_SYMBOL,
    ATTRIBUTE_SYMBOL
  } from './Component.js';

class ScrollView extends Component {
  constructor() {
    super();
    this.created();
  }
  created () {
    this[PROPERTY_SYMBOL].root = document.createElement('div');
    this[PROPERTY_SYMBOL].placeHolder = document.createElement('div');
    this[PROPERTY_SYMBOL].placeHolder.style.backgroundColor = 'lightgreen';
    this[PROPERTY_SYMBOL].root.appendChild(this[PROPERTY_SYMBOL].placeHolder);

    this[PROPERTY_SYMBOL].root.addEventListener('scroll', e => {
      /* 加载更多的思路1:
      console.log('scroll');
      let clientRect = this[PROPERTY_SYMBOL].root.getBoundingClientRect();
      let scrollHeight = this[PROPERTY_SYMBOL].root.scrollHeight;
      let scrollTop = this[PROPERTY_SYMBOL].root.scrollTop;
      if (scrollHeight - scrollTop <= clientRect.height) {
        this.triggerEvent('scrollToBottom');
      }
      */

      // 加载更多的思路2:，利用占位元素
     let clientRect = this[PROPERTY_SYMBOL].root.getBoundingClientRect();
     let placeHolderRect = this[PROPERTY_SYMBOL].placeHolder.getBoundingClientRect();
    //  console.log(clientRect.bottom, placeHolderRect.top);
     if (clientRect.bottom < placeHolderRect.top) {
       this.triggerEvent('scrollToBottom');
     }
    });
  }
  appendChild(child) {
    this.children.push(child);
    child.appendTo(this[PROPERTY_SYMBOL].root);
    this[PROPERTY_SYMBOL].root.appendChild(this[PROPERTY_SYMBOL].placeHolder);
  }
  get children() {
    return this[PROPERTY_SYMBOL].children;
  }
  get style() {
    return this[PROPERTY_SYMBOL].root.style;
  }
  setAttribute(name, value) {
    // hook
    if (name === 'style') {
      this[PROPERTY_SYMBOL].root.setAttribute('style', value);
    }
    if (name === "placeHolderText") {
      this[PROPERTY_SYMBOL].placeHolder.innerText = value;
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }
}

export default ScrollView;