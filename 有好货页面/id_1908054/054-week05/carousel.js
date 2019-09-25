import { cubicBezier } from "./cubicBezier";
import { Timeline, DOMElementStyleAnimation } from "./animation";
import { enableGesture } from "./gesture";

let ease = cubicBezier(0.25, 0.1, 0.25, 1);

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
const TIMELINE = Symbol("timeLine");

export default class Carousel {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
    this[TIMELINE] = Timeline;
    //将传入的config传入内部
    for (let i in config) {
      this[ATTRIBUTE_SYMBOL][i] = config[i];
    }
    this.position = 0;
    this.children = [];
    this.created();
  }

  appendTo(element) {
    element.appendChild(this[ATTRIBUTE_SYMBOL].container);
    this.mounted();
  }

  addChildren(imgs) {
    for (let d of imgs) {
      let e = document.createElement("img");
      e.src = d;
      this[ATTRIBUTE_SYMBOL].container.appendChild(e);
    }
    this.children = Array.prototype.slice.call(
      this[ATTRIBUTE_SYMBOL].container.children
    );
    // 给图片设置样式
    this.children.map(item => {
      item.style.cssText = `width: 100%;
      height: 100%;
      display: inline-block;`;
    });
    this.mounted();
  }
  nextPic() {
    let nextPosition = this.position + 1;
    nextPosition = nextPosition % this.children.length;
    let current = this.children[this.position],
      next = this.children[nextPosition];
    this.offsetStartTime = Date.now();
    let widthNum =
      this[PROPERTY_SYMBOL].width || this[ATTRIBUTE_SYMBOL].width || 500;
    this[TIMELINE].addAnimation(
      new DOMElementStyleAnimation(
        current,
        "transform",
        0,
        -widthNum * this.position,
        500,
        -widthNum - widthNum * this.position,
        v => `translateX(${v}px)`
      )
    );
    this[TIMELINE].addAnimation(
      new DOMElementStyleAnimation(
        next,
        "transform",
        0,
        widthNum - widthNum * nextPosition,
        500,
        -widthNum * nextPosition,
        v => `translateX(${v}px)`
      )
    );
    this.position = nextPosition;
    this[TIMELINE].restart();

    this.nextPicTimer = setTimeout(
      this.nextPic.bind(this),
      this[ATTRIBUTE_SYMBOL].speed
    );
  }
  addSomeEventListener(container) {
    let widthNum =
      this[PROPERTY_SYMBOL].width || this[ATTRIBUTE_SYMBOL].width || 500;

    container.addEventListener("touchstart", event => {
      clearTimeout(this.nextPicTimer);
      this[TIMELINE].pause();
    });
    container.addEventListener("mousedown", event => {
      this[TIMELINE].pause();
      this.currentTime = Date.now();
      if (this.currentTime - this.offsetStartTime < 1000) {
        this.offset =
          widthNum -
          ease((this.currentTime - this.offsetStartTime) / 1000) * 500;
      } else {
        this.offset = 0;
      }
      clearTimeout(this.nextPicTimer);
    });
    container.addEventListener("mouseup", event => {
      this.nextPicTimer = setTimeout(
        this.nextPic,
        this[ATTRIBUTE_SYMBOL].speed
      );
    });
    container.addEventListener("pan", event => {
      if (event.isVertical) return;
      for (let child of this.children) {
        child.style.transition = "ease 0s";
        child.style.transform = `translateX(${event.dx + this.x}px`;
      }
      let current = this.children[this.position];
      let next = this.children[
        (this.children.length + this.position + 1) % this.children.length
      ];
      let nextPosition =
        (this.children.length + this.position + 1) % this.children.length;
      let prev = this.children[
        (this.children.length + this.position - 1) % this.children.length
      ];
      let prevPosition =
        (this.children.length + this.position - 1) % this.children.length;

      next.style.transition = "ease 0s";
      next.style.transform = `translate(${widthNum -
        widthNum * nextPosition +
        event.dx +
        this.offset}px)`;
      prev.style.transition = "ease 0s";
      prev.style.transform = `translate(${-widthNum -
        widthNum * prevPosition +
        event.dx +
        this.offset}px)`;
      current.style.transition = "ease 0s";
      current.style.transform = `translate(${-widthNum * this.position +
        event.dx +
        this.offset}px)`;
    });
    container.addEventListener("panend", event => {
      if (event.isVertical) return;
      if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
        if (event.dx > 0) {
          this.position = this.position - 1;
        }
        if (event.dx < 0) {
          this.position = this.position + 1;
        }
      } else {
        this.position = Math.round(
          (this.position * widthNum - event.dx) / widthNum
        );
      }
      this.position =
        (this.children.length + this.position) % this.children.length;

      let current = this.children[this.position];
      let next = this.children[
        (this.children.length + this.position + 1) % this.children.length
      ];
      let nextPosition =
        (this.children.length + this.position + 1) % this.children.length;
      let prev = this.children[
        (this.children.length + this.position - 1) % this.children.length
      ];
      let prevPosition =
        (this.children.length + this.position - 1) % this.children.length;

      next.style.transition = "";
      next.style.transform = `translate(${widthNum -
        widthNum * nextPosition}px)`;
      prev.style.transition = "";
      prev.style.transform = `translate(${-widthNum -
        widthNum * prevPosition}px)`;
      // 当前图片移出
      current.style.transition = "";
      current.style.transform = `translate(${-widthNum * this.position}px)`;
      for (let child of this.children) {
        child.style.transition = "";
        child.style.transform = `translate(${-this.position * widthNum}px)`;
      }
      this.x = -this.position * widthNum;
    });
  }
  // 创建期
  created() {
    // if (!this[ATTRIBUTE_SYMBOL].container) {
    //   return
    // }
    this[ATTRIBUTE_SYMBOL].container = document.createElement("div");

    // 禁止默认操作
    this[ATTRIBUTE_SYMBOL].container.addEventListener("mousedown", event =>
      event.preventDefault()
    );
    // 存入类名
    let className = this[ATTRIBUTE_SYMBOL].className || "carousel";
    this[ATTRIBUTE_SYMBOL].container.classList.add(className);
    // 引入手势库
    enableGesture(this[ATTRIBUTE_SYMBOL].container);

    // 启用各种监听 实现各种操作
    this.addSomeEventListener(this[ATTRIBUTE_SYMBOL].container);
  }
  // 挂载期
  mounted() {
    // 设置容器样式
    this[ATTRIBUTE_SYMBOL].container.style.cssText = `width: ${this[
      PROPERTY_SYMBOL
    ].width ||
      this[ATTRIBUTE_SYMBOL].width ||
      500}px;
      height: ${this[ATTRIBUTE_SYMBOL].height || "300"}px;
      overflow: hidden;
      outline: 1px solid rosybrown;
      white-space: nowrap;`;
    // handler用于保存和时序相关的操作
    this.handler = null;
    // 塞入图片 挂进去 并进入挂载期
    // this.addChildren();
    // 使用animation 实现动画 并可同时实现鼠标操作
    // 实质上就是使用pause 暂停正在播放的动画
    this[TIMELINE] = new Timeline();
    this.offsetStartTime = 0;
    if (this[ATTRIBUTE_SYMBOL].autoPlay) {
      setTimeout(this.nextPic.bind(this), this[ATTRIBUTE_SYMBOL].speed);
    }

    this.x = 0;
    this.offset = 0;
  }

  unmounted() {}
  update() {}

  log() {
    console.log("width:", this.width);
  }
  get width() {
    return this[PROPERTY_SYMBOL].width;
  }
  set width(value) {
    return (this[PROPERTY_SYMBOL].width = value);
  }
  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    if (name === "width") {
      this.width = value;
      // this.triggerEvent("widthchange");
    }
    if (name === "autoPlay") {
      if (this[ATTRIBUTE_SYMBOL].autoPlay) {
        this.nextPicTimer = setTimeout(
          this.nextPic,
          this[ATTRIBUTE_SYMBOL].speed
        );
      } else {
        clearTimeout(this.nextPicTimer);
      }
    }
    if (name === "imgs") {
      this.addChildren(value);
    }
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set();
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) return;
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    for (let event of this[EVENT_SYMBOL][type]) event.call(this);
  }
}