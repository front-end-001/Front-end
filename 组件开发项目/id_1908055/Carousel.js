import { enableGesture } from "./gesture.js";
import { Component } from './Component.js';

const ATTRIBUTE_SYMBOL = Symbol('attribute');
const PROPERTY_SYMBOL = Symbol('property');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export class Swiper extends Component {
  constructor(options) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
  }
  
  loop() {
    let children = Array.from(this.root.children);
    let position = 0;
    let nextFrame = () => {
      /*
        position 0 nextPosition (0 + 1) % 4 = 1 nextPosition (position + 1) % 4 = 1
        position 1 nextPosition (1 + 1) % 4 = 2 nextPosition (position + 1) % 4 = 1
        position 2 nextPosition (2 + 1) % 4 = 3 nextPosition (position + 1) % 4 = 1
        position 3 nextPosition (3 + 1) % 4 = 0 nextPosition (position + 1) % 4 = 1
      */
      let nextPosition = (position + 1) % children.length; // 计算下一张图的位置
      // 这种方法的优势在于 不管图片有多少张 只移动两张
      let current = children[position];
      let next = children[nextPosition];
      // 把next放到正确的位置
      next.style.transition = "ease 0s"; // transition-duration 时长为0，不会产生过渡效果
      next.style.transform = `translate(${100 - 100 * nextPosition}%)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          //把current挪出视口
          current.style.transition = ""; //transition置空，css中的属性就会生效
          current.style.transform = `translate(${- 100 - 100 * position}%)`;
          //把next挪进视口
          next.style.transition = "";
          next.style.transform = `translate(${- 100 * nextPosition}%)`;

          position = nextPosition;
        })
      })
      setTimeout(nextFrame, this[PROPERTY_SYMBOL].delay || 3000);
    }
    setTimeout(nextFrame, this[PROPERTY_SYMBOL].delay || 3000);
  }

  created() {

  }

  mounted() {
    enableGesture(this.root);
    // 挂载
    for (let i = 0; i < this[ATTRIBUTE_SYMBOL].data.length; i++) {
      const e = this[ATTRIBUTE_SYMBOL].data[i];
      const img = document.createElement('img');
      img.src = e;
      img.style.cssText = "width: 100%; height: 100%";
      this.root.appendChild(img);
    }
    this.root.style.cssText = `width: ${this[ATTRIBUTE_SYMBOL].width}px; height: ${this[ATTRIBUTE_SYMBOL].height}px;overflow: hidden;white-space: nowrap;`;
    if (this[ATTRIBUTE_SYMBOL].autoplay) {
      this.loop();
    }

    const children = this.root.children;
    let startX = 0;
    let position = 0;
    this.root.addEventListener('pan', event => {
      if (event.isVertical) {
        return;
      }
      // 暂停
      for (let child of children) {
        child.style.transition = 'ease 0s';
        child.style.transform = `translate(${event.dx + startX}px)`;
      }
    })

    this.root.addEventListener('panend', event => {
      // let children = Array.from(children);

      if (event.isVertical) {
        return
      }

      if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
        if (event.dx > 0) {
          position -= 1
        }

        if (event.dx < 0) {
          position += 1
        }
      } else {
        position = -(Math.round((startX + event.dx) / 500));
      }
      // 最大3
      position = Math.max(0, Math.min(position, children.length - 1));
      for (let child of children) {
        child.style.transition = "";
        child.style.transform = `translate(${-position * 500}px)`;
      }
      startX = -position * 500;
    })

    this.root.addEventListener('flick', event => {
      console.log('flick')
    })

    this.root.addEventListener('pancancel', event => {
    })

    this.root.addEventListener('pressstart', event => {
      console.log('pressstart')
    })

    this.root.addEventListener('pressend', event => {
      console.log('pressend')
    })

    this.root.addEventListener('presscancel', event => {
      for (let child of children) {
        child.style.transition = "";
        child.style.transform = `translate(${-position * 500}px)`;
      }
      startX = -position * 500;
    })


    this.root.addEventListener('mousedown', event => event.preventDefault())
  }

}
