import { Component, PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL } from './Component.js';
import {
  TimeLine, DOMElementStyleNumberAnimation, ease
} from '../lib/animation.js';
import enableGesture from '../lib/gesture.js';

// property attribute 如何存
class Carousel extends Component {
  constructor(config) {
    super();
    // life cycle
    this.created();
  }
  created() {
    // 创造容器并设置样式
    this[PROPERTY_SYMBOL].root = document.createElement('div');
    this[PROPERTY_SYMBOL].offsetTimeStart = 0;
    this[PROPERTY_SYMBOL].nextPicTimer = null;
    this[PROPERTY_SYMBOL].children = [];
    this[PROPERTY_SYMBOL].position = 0;
    this[PROPERTY_SYMBOL].nextPosition = 1;
  }
  mounted() {
    // 追加图片
    // this._drag();
    // this._animation();
  }
  setData(data) {
    this[PROPERTY_SYMBOL].data = data.map(item => item.imageUrl);
    this._clearChildren();
    this._render();
    this._animation();
  }
  _render() {
    for (let d of this[PROPERTY_SYMBOL].data) {
      let e = document.createElement('img');
      e.src = d;
      e.style.width = '100%';
      e.style.height = '100%';
      e.style.display = 'inline-block';
      this[PROPERTY_SYMBOL].root.appendChild(e);
    }
  }
  _clearChildren() {
    for (let child of this[PROPERTY_SYMBOL].children) {
      this[PROPERTY_SYMBOL].root.removeChild(child);
    }
  }
  _animation() {
    if (!this[PROPERTY_SYMBOL].tl) {
      this[PROPERTY_SYMBOL].tl = new TimeLine();
    } else {
      clearTimeout(this[PROPERTY_SYMBOL].nextPicTimer);
    }

    this[PROPERTY_SYMBOL].children = Array.prototype.slice.call(this[PROPERTY_SYMBOL].root.children);
    this[PROPERTY_SYMBOL].position = 0; // 当前展示图片的位置
    let nextPic = () => {
      let position = this[PROPERTY_SYMBOL].position;
      this[PROPERTY_SYMBOL].nextPosition = position + 1; // 下一张要显示的图片位置

      this[PROPERTY_SYMBOL].nextPosition = this[PROPERTY_SYMBOL].nextPosition % this[PROPERTY_SYMBOL].children.length; // nextPosition一直递增，这里需要做求余处理

      let nextPosition = this[PROPERTY_SYMBOL].nextPosition;

      // 每次移动两张图片
      let current = this[PROPERTY_SYMBOL].children[position],
        next = this[PROPERTY_SYMBOL].children[nextPosition];

      // 获取父元素的宽度
      let offsetWidth = this[PROPERTY_SYMBOL].root.getBoundingClientRect().width;

      this[PROPERTY_SYMBOL].offsetTimeStart = Date.now();

      this[PROPERTY_SYMBOL].tl.removeAllAnimations();
      this[PROPERTY_SYMBOL].tl.addAnimation(new DOMElementStyleNumberAnimation(
        current,
        'transform',
        0, -offsetWidth * position,
        1000, -offsetWidth - offsetWidth * position,
        (v) => `translateX(${v}px)`
      ));

      this[PROPERTY_SYMBOL].tl.addAnimation(new DOMElementStyleNumberAnimation(
        next,
        'transform',
        0, offsetWidth - offsetWidth * nextPosition,
        1000, -offsetWidth * nextPosition,
        (v) => `translateX(${v}px)`
      ));
      this[PROPERTY_SYMBOL].tl.restart();

      this[PROPERTY_SYMBOL].position = this[PROPERTY_SYMBOL].nextPosition;

      // 在nextFrame将nextFrame自身加入异步队列，形成了setInterval的效果
      this[PROPERTY_SYMBOL].nextPicTimer = setTimeout(nextPic, 3000);
    };
    // 轮播
    this[PROPERTY_SYMBOL].nextPicTimer = setTimeout(nextPic, 3000);
  }
  _drag() {
    enableGesture(this[PROPERTY_SYMBOL].root);

    // 获取父元素的宽度
    let offsetWidth = this[PROPERTY_SYMBOL].root.getBoundingClientRect().width;
    let offset = 0;
    this[PROPERTY_SYMBOL].root.addEventListener('mousedown', event => {
      this[PROPERTY_SYMBOL].tl.pause();
      let currentTime = Date.now();
      if (currentTime - this[PROPERTY_SYMBOL].offsetTimeStart < 1000) {
        offset = offsetWidth - ease((currentTime - this[PROPERTY_SYMBOL].offsetTimeStart) / 1000) * offsetWidth;
        console.log(offset);
      } else {
        offset = 0;
      }
      clearTimeout(this[PROPERTY_SYMBOL].nextPicTimer);
      this[PROPERTY_SYMBOL].nextPicTimer = null;
    });

    // 将拖拽改造成轮播的思路以适应动画
    this[PROPERTY_SYMBOL].root.addEventListener('pan', event => {
      // console.log('pan');
      if (event.isVertical) {
        return;
      }

      // 拖拽适应轮播
      event.preventDefault();
      let children = this[PROPERTY_SYMBOL].children;
      let position = this[PROPERTY_SYMBOL].position;
      let current = children[position];

      let nextPosition = (position + 1) % children.length;
      let next = children[nextPosition];
      let lastPosition = (children.length + position - 1) % children.length; // 代替循环
      let last = children[lastPosition];

      last.style.transition = 'ease 0s';
      last.style.transform = `translate(${-offsetWidth - offsetWidth * lastPosition + event.dx + offset}px)`;

      next.style.transition = 'ease 0s';
      next.style.transform = `translate(${offsetWidth - offsetWidth * nextPosition + event.dx + offset}px)`;

      current.style.transition = 'ease 0s';
      current.style.transform = `translate(${- offsetWidth * position + event.dx + offset}px)`;
    });

    // 当移动的非常快时，即便图片不靠近窗口也需要能移动过去  flick/swipe  足够快、足够远
    this[PROPERTY_SYMBOL].root.addEventListener('panend', event => {
      event.preventDefault();
      let children = this[PROPERTY_SYMBOL].children;
      if (event.isVertical)
        return;
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
        if (event.dx > 250) {
          this[PROPERTY_SYMBOL].position = this[PROPERTY_SYMBOL].position - 1;
          isLeft = true;
        } else if (event.dx < -250) {
          this[PROPERTY_SYMBOL].position = this[PROPERTY_SYMBOL].position + 1;
          isLeft = false;
        } else if(event.dx > 0) {
          isLeft = false;
        } else {
          isLeft = true;
        }
      }

      // 处理边界情况
      this[PROPERTY_SYMBOL].position = (children.length + this[PROPERTY_SYMBOL].position) % children.length;

      // 拖拽适应轮播
      let current = children[this[PROPERTY_SYMBOL].position];
      let nextPosition = (this[PROPERTY_SYMBOL].position + 1) % children.length;
      let next = children[nextPosition];
      let lastPosition = (children.length + this[PROPERTY_SYMBOL].position - 1) % children.length;
      let last = children[lastPosition];

      if (!isLeft) {
        last.style.transition = '';
      } else {
        last.style.transition = 'ease 0s';
      }
      
      last.style.transform = `translate(${-offsetWidth - offsetWidth * lastPosition}px)`;

      if (isLeft) {
        next.style.transition = '';
      } else {
        next.style.transition = 'ease 0s';
      }
      next.style.transform = `translate(${offsetWidth - offsetWidth * nextPosition}px)`;

      current.style.transition = '';
      current.style.transform = `translate(${- offsetWidth * this[PROPERTY_SYMBOL].position}px)`;
    });

    // 阻止图片鼠标默认的拖拽行为
    this[PROPERTY_SYMBOL].root.addEventListener('mousedown', event => event.preventDefault());
    document.addEventListener("touchmove", event => event.preventDefault(), {passive:false})
  }
  // getAttribute(name) {
  //   return this[ATTRIBUTE_SYMBOL][name];
  // }
  setAttribute(name, value) {
    // hook
    if (name === 'style') {
      this[PROPERTY_SYMBOL].root.setAttribute('style', value);
    }
    if (name === 'data') {
      this.setData(value);
    }
    // hook
    if (name === 'width') {
      this.width = value; // attribute单向同步到property
      if (this[EVENT_SYMBOL]['widthchange']) {
        this.triggerEvent('widthchange');
      }
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }
  log() {
    console.log('width:', this.width);
  }
  get width() {
    return this[PROPERTY_SYMBOL].width;
  }
  set width(value) {
    return this[PROPERTY_SYMBOL].width = value;
  }
}

export default Carousel