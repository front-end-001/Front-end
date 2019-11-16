/**
 * @file TabView组件
 */
import {
  Component,
  PROPERTY_SYMBOL,
  ATTRIBUTE_SYMBOL,
  STATE_SYMBOL
} from './Component.js';
import enableGesture from '../lib/gesture.js';

// 测试是否只加载一次
// import RecommendItemView from './RecommendListView.js';

class TabView extends Component {
  constructor() {
    super();
    this[PROPERTY_SYMBOL].headers = [];

    this.created();
  }
  created() {
    // 初始化包含tab按钮和tab内容的容器
    this[PROPERTY_SYMBOL].root = document.createElement('div');
    this[PROPERTY_SYMBOL].root.style.display = 'flex';
    this.headContainer = document.createElement('div');
    this.contentContainer = document.createElement('div');

    this.contentContainer.style.whiteSpace = 'nowrap';
    this.contentContainer.style.overflow = 'hidden';
    this.contentContainer.style.height = '100%';
    this.contentContainer.style.flex = '1';
    this.headContainer.style.height = '93px';

    this[PROPERTY_SYMBOL].root.appendChild(this.headContainer);
    this[PROPERTY_SYMBOL].root.appendChild(this.contentContainer);

    enableGesture(this.contentContainer);

    this[PROPERTY_SYMBOL].root.addEventListener(
      'touchmove',
      function(e) {
        // 手机端手势不触发
        e.cancelBubble = true;
        e.stopImmediatePropagation();
      },
      { passive: false }
    );

    this[STATE_SYMBOL].position = 0; // n

    // 在create中绑定事件
    this.contentContainer.addEventListener('pan', event => {
      if (event.isVertical) {
        return;
      }

      event.preventDefault();

      let dx = event.dx;

      // console.log(dx);

      if (this[STATE_SYMBOL].position === 0 && dx > 0) {
        dx = dx / 2;
      }

      if (
        this[STATE_SYMBOL].position ===
          this.contentContainer.children.length - 1 &&
        dx < 0
      ) {
        dx = dx / 2;
      }

      let width = this.contentContainer.getBoundingClientRect().width;

      for (let i = 0; i < this.contentContainer.children.length; i++) {
        this.contentContainer.children[i].style.transition =
          'transfrom ease 0s';
        this.contentContainer.children[i].style.transform = `translateX(${dx -
          width * this[STATE_SYMBOL].position}px)`;
      }
    });

    // 当移动的非常快时，即便图片不靠近窗口也需要能移动过去  flick/swipe  足够快、足够远
    this.contentContainer.addEventListener('panend', event => {
      if (event.isVertical) {
        return;
      }

      event.preventDefault();

      let width = this.contentContainer.getBoundingClientRect().width;

      let isLeft;
      if (event.isFlick) {
        // x分量大于y的分量才触发
        // console.log('flick');
        if (event.dx > 0) {
          this[STATE_SYMBOL].position--;
          isLeft = true;
        }
        if (event.dx < 0) {
          this[STATE_SYMBOL].position++;
          isLeft = false;
        }
      } else {
        if (event.dx > width / 2) {
          this[STATE_SYMBOL].position--;
          isLeft = true;
        } else if (event.dx < -width / 2) {
          this[STATE_SYMBOL].position++;
          isLeft = false;
        } else if (event.dx > 0) {
          isLeft = false;
        } else {
          isLeft = true;
        }
      }

      if (this[STATE_SYMBOL].position < 0) {
        this[STATE_SYMBOL].position = 0;
      }

      if (
        this[STATE_SYMBOL].position >= this.contentContainer.children.length
      ) {
        this[STATE_SYMBOL].position = this.contentContainer.children.length - 1;
      }

      for (let i = 0; i < this.contentContainer.children.length; i++) {
        this.contentContainer.children[i].style.transition =
          'transfrom ease 0.5s';
        this.contentContainer.children[
          i
        ].style.transform = `translateX(${-width *
          this[STATE_SYMBOL].position}px)`;
      }

      // 设置tab-title样式
      for (let i = 0; i < this.headContainer.children.length; i++) {
        if (i === this[STATE_SYMBOL].position) {
          this.headContainer.children[i].style.borderBottom = '2px solid white';
          this.headContainer.children[i].style.fontSize = '23px';
          this.headContainer.children[i].style.fontWeight = 'normal';
        } else {
          this.headContainer.children[i].style.borderBottom = 'none';
          this.headContainer.children[i].style.fontWeight = 'lighter';
        }
      }
    });
  }
  mounted() {
    Array.prototype.slice.call(
      this.headContainer.children
    )[0].style.borderBottom = '2px solid white';
    Array.prototype.slice.call(
      this.headContainer.children
    )[0].style.fontWeight = 'normal';
  }
  appendChild(child) {
    let n = this.children.length;
    this.children.push(child);

    let title = child.getAttribute('tab-title') || '';
    this[PROPERTY_SYMBOL].headers.push(title);

    // tab-title
    let header = document.createElement('div');
    header.innerText = title;
    header.style.color = 'white';
    header.style.display = 'inline-block';
    header.style.fontSize = '23px';
    header.style.fontFamily = 'PingFang SC';
    header.style.fontWeight = 'lighter';
    header.style.margin = '30px 15px 0 15px';
    // 注意 innerText和textContent的不同   https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#Differences_from_innerText
    this.headContainer.appendChild(header);

    header.addEventListener('click', event => {
      // 记录当前tab索引
      this[STATE_SYMBOL].position = n;
      // 设置tab-title样式
      for (let i = 0; i < this.headContainer.children.length; i++) {
        this.headContainer.children[i].style.borderBottom = 'none';
        this.headContainer.children[i].style.fontWeight = 'lighter';
      }
      header.style.borderBottom = '2px solid white';
      header.style.fontWeight = 'normal';
      
      for (let i = 0; i < this.contentContainer.children.length; i++) {
        this.contentContainer.children[i].style.transition = 'ease 0.5s';
        this.contentContainer.children[i].style.transform = `translateX(${-n *
          100}%)`;
      }
    });

    // tab-content
    child.appendTo(this.contentContainer);
    for (let i = 0; i < this.contentContainer.children.length; i++) {
      this.contentContainer.children[i].style.width = '100%';
      this.contentContainer.children[i].style.height = '100%';
      this.contentContainer.children[i].style.verticalAlign = 'top';
      this.contentContainer.children[i].style.display = 'inline-block';
    }
  }
  setAttribute(name, value) {
    // hook
    if (name === 'style') {
      this[PROPERTY_SYMBOL].root.setAttribute('style', value);
      this[PROPERTY_SYMBOL].root.style.display = 'flex';
      this[PROPERTY_SYMBOL].root.style.flexDirection = 'column';
    }
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }
}

export default TabView;
