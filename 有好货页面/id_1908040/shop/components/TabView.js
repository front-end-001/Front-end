/**
 * @file TabView组件
 */

import { ease, TimeLine, DOMElementStyleNumberAnimation } from '../lib/animation.js';
import enableGesture from '../lib/gesture.js';

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

class TabView {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];
    this[PROPERTY_SYMBOL].headers = [];
    this[PROPERTY_SYMBOL].position = 0;
    this[PROPERTY_SYMBOL].nextPosition = 1;
    this[PROPERTY_SYMBOL].tl = null;

    this.created();
  }
  appendTo(element) {
    element.appendChild(this.root);
    this.mounted();
  }
  created() {
    // 初始化包含tab按钮和tab内容的容器
    this.root = document.createElement('div');
    this.root.style.display = 'flex';
    this.headContainer = document.createElement('div');
    this.contentContainer = document.createElement('div');

    this.contentContainer.style.whiteSpace = 'nowrap';
    this.contentContainer.style.overflow = 'hidden';
    this.contentContainer.style.height = '100%';
    this.contentContainer.style.flex = '1';
    this.headContainer.style.height = '93px';

    this.root.appendChild(this.headContainer);
    this.root.appendChild(this.contentContainer);
    this[STATE_SYMBOL].h = 0;
  }
  mounted() {
    this._drag();
    this._click();
    Array.prototype.slice.call(this.headContainer.children)[0].style.borderBottom = '1px solid black';
    Array.prototype.slice.call(this.headContainer.children)[0].style.fontWeight = 'normal';
  }
  unmountd() {}
  update() {}
  // tab头点击
  _click() {
    let tabTitles = Array.prototype.slice.call(this.headContainer.children);
    this.headContainer.addEventListener('click', event => {
      let position = this[PROPERTY_SYMBOL].position;
      let nextPosition = position;
      // 获取当前点击的tab-title索引
      let tabTitle = event.target;
      for (let i = 0; i < tabTitles.length; i++) {
        tabTitles[i].style.borderBottom = 'none';
        tabTitles[i].style.fontWeight = 'lighter';
        if (tabTitles[i] === tabTitle) {
          // 点击之后的位置
          nextPosition = i;
          tabTitles[i].style.borderBottom = '1px solid black';
          tabTitles[i].style.fontWeight = 'normal';
        }
      }

      console.log('position', position, 'nextPosition', nextPosition);

      // 设置tab-content动画
      if (!this[PROPERTY_SYMBOL].tl) {
        this[PROPERTY_SYMBOL].tl = new TimeLine();
      }
      this._nextPic(position, nextPosition);
    });
  }
  _nextPic(position, nextPosition) {
      let tabViewWidth = window.innerWidth;
      let current = this.contentContainer.children[position],
        next = this.contentContainer.children[nextPosition];

      this[PROPERTY_SYMBOL].tl.removeAllAnimations();
      if (position < nextPosition) {
        // 从右往左
        this[PROPERTY_SYMBOL].tl.addAnimation(new DOMElementStyleNumberAnimation(
          current,
          'transform',
          0, -tabViewWidth * position,
          1000, -tabViewWidth - tabViewWidth * position,
          (v) => `translateX(${v}px)`
        ));
        this[PROPERTY_SYMBOL].tl.addAnimation(new DOMElementStyleNumberAnimation(
          next,
          'transform',
          0, tabViewWidth - tabViewWidth * nextPosition,
          1000, -tabViewWidth * nextPosition,
          (v) => `translateX(${v}px)`
        ));
      } else if (position > nextPosition) {
        // 从左往右
        this[PROPERTY_SYMBOL].tl.addAnimation(new DOMElementStyleNumberAnimation(
          current,
          'transform',
          0, -tabViewWidth * position,
          1000, -tabViewWidth + tabViewWidth * position,
          (v) => `translateX(${-v}px)`
        ));
        console.log('current', -tabViewWidth * position, -tabViewWidth + tabViewWidth * position);
        this[PROPERTY_SYMBOL].tl.addAnimation(new DOMElementStyleNumberAnimation(
          next,
          'transform',
          0, tabViewWidth - tabViewWidth * nextPosition,
          1000, tabViewWidth * nextPosition,
          (v) => `translateX(${-v}px)`
        ));
        console.log('next', tabViewWidth - tabViewWidth * nextPosition, tabViewWidth * nextPosition);
      }
      this[PROPERTY_SYMBOL].tl.restart();

      this[PROPERTY_SYMBOL].position = nextPosition;
  }
  // tab内容拖拽
  _drag() {
    enableGesture(this.contentContainer);

    let tabViewWidth = window.innerWidth;
    let offset = 0;
    this.contentContainer.addEventListener('mousedown', event => {
      console.log('mousedown');
      let currentTime = Date.now();
      if (currentTime - this[PROPERTY_SYMBOL].offsetTimeStart < 1000) {
        offset =
          tabViewWidth -
          ease((currentTime - this[PROPERTY_SYMBOL].offsetTimeStart) / 1000) *
            tabViewWidth;
      } else {
        offset = 0;
      }
      /*
      clearTimeout(this[PROPERTY_SYMBOL].nextPicTimer);
      this[PROPERTY_SYMBOL].nextPicTimer = null;
      */
    });

    // 将拖拽改造成轮播的思路以适应动画
    this.contentContainer.addEventListener('pan', event => {
      if (event.isVertical) {
        return;
      }
      console.log('pan');
      // 拖拽适应轮播
      event.preventDefault();
      let children = this[PROPERTY_SYMBOL].children;
      let position = this[PROPERTY_SYMBOL].position;
      let current = children[position];

      let nextPosition = (position + 1) % children.length;
      let next = children[nextPosition];
      let lastPosition = (children.length + position - 1) % children.length; // 代替循环
      let last = children[lastPosition];

      // 拖拽的是Scroll
      last.setStyle('transition', 'ease 0s');
      last.setStyle('transform', `translate(${-tabViewWidth -
        tabViewWidth * lastPosition +
        event.dx +
        offset}px)`);

      next.setStyle('transition', 'ease 0s');
      next.setStyle('transform', `translate(${tabViewWidth -
          tabViewWidth * lastPosition +
          event.dx +
          offset}px)`);
        
      current.setStyle('transition', 'ease 0s');
      current.setStyle('transform', `translate(${-
          tabViewWidth * lastPosition +
          event.dx +
          offset}px)`);
    });

    this.contentContainer.addEventListener('panend', event => {
      event.preventDefault();
      let children = this[PROPERTY_SYMBOL].children;
      if (event.isVertical) return;
      let isLeft;
      if (event.isFlick) {
        // x分量大于y的分量才触发
        // console.log('flick');
        if (event.dx > 0) {
          this[PROPERTY_SYMBOL].position = this[PROPERTY_SYMBOL].position - 1;
          isLeft = true;
        }
        if (event.dx < 0) {
          this[PROPERTY_SYMBOL].position = this[PROPERTY_SYMBOL].position + 1;
          isLeft = false;
        }
      } else {
        if (event.dx > tabViewWidth / 2) {
          this[PROPERTY_SYMBOL].position = this[PROPERTY_SYMBOL].position - 1;
          isLeft = true;
        } else if (event.dx < -tabViewWidth / 2) {
          this[PROPERTY_SYMBOL].position = this[PROPERTY_SYMBOL].position + 1;
          isLeft = false;
        } else if (event.dx > 0) {
          isLeft = false;
        } else {
          isLeft = true;
        }
      }

      // 处理边界情况
      this[PROPERTY_SYMBOL].position =
        (children.length + this[PROPERTY_SYMBOL].position) % children.length;

      // 拖拽适应轮播
      let current = children[this[PROPERTY_SYMBOL].position];
      let nextPosition = (this[PROPERTY_SYMBOL].position + 1) % children.length;
      let next = children[nextPosition];
      let lastPosition =
        (children.length + this[PROPERTY_SYMBOL].position - 1) %
        children.length;
      let last = children[lastPosition];

      if (!isLeft) {
        last.setStyle('transition', '');
      } else {
        last.setStyle('transition', 'ease 0s');
      }
      last.setStyle('transform', `translate(${-tabViewWidth - tabViewWidth * lastPosition}px)`);

      if (isLeft) {
        next.setStyle('transition', '');
      } else {
        next.setStyle('transition', 'ease 0s');
      }
      last.setStyle('transform', `translate(${tabViewWidth - tabViewWidth * nextPosition}px)`);

      current.setStyle('transition', '');
      current.setStyle('transform', `translate(${-tabViewWidth *
        this[PROPERTY_SYMBOL].position}px)`);

      // 设置tab-title激活样式
      let titles = Array.prototype.slice.call(this.headContainer.children);
      for (let i = 0; i < titles.length; i++) {
        titles[i].style.borderBottom = 'none';
        titles[i].style.fontWeight = 'lighter';
        if (i === this[PROPERTY_SYMBOL].position) {
          titles[i].style.borderBottom = '1px solid black';
          titles[i].style.fontWeight = 'normal';
        }
      }
    });

    // 阻止图片鼠标默认的拖拽行为
    /*
    this.contentContainer.addEventListener('mousedown', event =>
      event.preventDefault()
    );
    document.addEventListener('touchmove', event => event.preventDefault(), {
      passive: false
    });
    */
  }
  appendChild(child) {
    this.children.push(child);

    let title = child.getAttribute('tab-title') || '';
    this[PROPERTY_SYMBOL].headers.push(title);

    let header = document.createElement('div');
    header.innerText = title;
    header.style.display = 'inline-block';
    header.style.fontSize = '23px';
    header.style.fontFamily = 'PingFang SC';
    header.style.fontWeight = 'lighter';
    header.style.margin = '30px 15px 0 15px';
    // 注意 innerText和textContent的不同   https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#Differences_from_innerText
    this.headContainer.appendChild(header);
    child.appendTo(this.contentContainer);
    for (let i = 0; i < this.contentContainer.children.length; i++) {
      this.contentContainer.children[i].style.width = '100%';
      this.contentContainer.children[i].style.height = '100%';
      this.contentContainer.children[i].style.display = 'inline-block';
    }
  }
  get children() {
    return this[PROPERTY_SYMBOL].children;
  }
  getAttribute(name) {
    if (name === 'style') {
      return this.root.getAttribute('style');
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    // hook
    if (name === 'style') {
      this.root.setAttribute('style', value);
      this.root.style.display = 'flex';
      this.root.style.flexDirection = 'column';
    }
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      return;
    }
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    if (!this[EVENT_SYMBOL].type) {
      return;
    }
    for (let event of this[EVENT_SYMBOL][type]) {
      event.call(this);
    }
  }
}

export default TabView;
