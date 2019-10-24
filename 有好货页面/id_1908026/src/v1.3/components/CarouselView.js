import "../../carousel.scss";
import { ease } from "../../v1.2/cubicBezier";
import enableGesture from "../../v1.2/gesture";
import Timeline from "../../v1.2/Timeline";
import DOMElementStyleNumberAnimation from "../../v1.2/DOMElementStyleNumberAnimation";

const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Carousel {
  constructor(data) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this.setAttribute("data", data);
    this.created();
  }

  created() {
    this._container = document.createElement("div");
    this._container.classList.add("carousel");
    // TODO: width无法同步
    requestAnimationFrame(() => {
      this._width = Number(
        getComputedStyle(this._container).width.replace("px", ""),
      );
    });

    this._handler = null;
    this.data = this.getAttribute("data");
  }

  mounted() {
    for (const url of this.data) {
      const img = document.createElement("img");
      img.src = url;
      this._container.appendChild(img);
    }

    const children = Array.prototype.slice.call(this._container.children);
    let position = 0;
    let offsetTimeStart = 0;
    const tl = new Timeline();
    /* eslint-disable */
    const nextPic = () => {
      const nextPosition = (position + 1) % children.length;
      const [current, next] = [children[position], children[nextPosition]];
      // 矫正下一张的位置
      next.style.transition = "ease 0s";
      next.style.transform = `translate(
          ${this._width - this._width * nextPosition}px
        )`;
      offsetTimeStart = Date.now();
      tl.clearAnimations();

      tl.addAnimation(
        new DOMElementStyleNumberAnimation(
          current,
          "transform",
          0,
          -this._width * position,
          500,
          -this._width - this._width * position,
          v => `translateX(${v}px)`
        )
      );

      tl.addAnimation(
        new DOMElementStyleNumberAnimation(
          next,
          "transform",
          0,
          this._width - this._width * nextPosition,
          500,
          -this._width * nextPosition,
          v => `translateX(${v}px)`
        )
      );
      console.log("添加完nimations");
      tl.restart();
      // setTimeout(() => {
      //   tl.clearTick();
      // }, 1000);
      position = nextPosition;
      this._handler = setTimeout(nextPic, 3000);
    };

    enableGesture(this._container);

    let offset = 0;
    this._container.addEventListener("mousedown", event => {
      event.preventDefault();
      tl.pause();
      let currentTime = Date.now();

      if (currentTime - offsetTimeStart < 500) {
        offset = 500 - ease((currentTime - offsetTimeStart) / 500) * 500;
      } else {
        offset = 0;
      }
      clearTimeout(this._handler);
    });

    this._container.addEventListener("touchstart", event => {
      event.preventDefault();
      tl.pause();
      let currentTime = Date.now();
      if (currentTime - offsetTimeStart < 500) {
        offset = 500 - ease((currentTime - offsetTimeStart) / 500) * 500;
      } else {
        offset = 0;
      }
      clearTimeout(this._handler);
    });

    this._container.addEventListener("pan", event => {
      if (event.isVertical) return;
      let lastPosition = (children.length + position - 1) % children.length;
      let nextPosition = (position + 1) % children.length;
      let last = children[lastPosition];
      let current = children[position];
      let next = children[nextPosition];

      last.style.transition = "ease 0s";
      last.style.transform = `translate(
          ${-this._width - this._width * lastPosition + event.dx + offset}px
        )`;

      current.style.transition = "ease 0s";
      current.style.transform = `translate(
          ${-this._width * position + event.dx + offset}px
        )`;
      next.style.transition = "ease 0s";
      next.style.transform = `translate(
          ${this._width - this._width * nextPosition + event.dx + offset}px
        )`;
    });

    this._container.addEventListener("panend", event => {
      if (event.isVertical) return;
      let isLeft; // true：左边图片需要过渡；flase：右边图片需要过渡
      if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
        if (event.dx > 0) {
          position -= 1;
          isLeft = true;
        } else {
          position += 1;
          isLeft = false;
        }
      } else {
        if (event.dx + offset >= this._width / 2) {
          position -= 1;
          isLeft = true;
        } else if (event.dx + offset <= -this._width / 2) {
          position += 1;
          isLeft = false;
        } else if (event.dx + offset >= 0) {
          isLeft = false;
        } else {
          isLeft = true;
        }
      }
      position = (children.length + position) % children.length;
      let current = children[position];
      let lastPosition = (children.length + position - 1) % children.length;
      let nextPosition = (position + 1) % children.length;
      let last = children[lastPosition];
      let next = children[nextPosition];

      if (isLeft) {
        next.style.transition = "";
        last.style.transition = "ease 0s";
      } else {
        next.style.transition = "ease 0s";
        last.style.transition = "";
      }
      current.style.transition = "";

      last.style.transform = `translate(
          ${-this._width - this._width * lastPosition}px
        )`;
      current.style.transform = `translate(
          ${-this._width * position}px
        )`;
      next.style.transform = `translate(
          ${this._width - this._width * nextPosition}px
        )`;
    });

    this._container.addEventListener("mousedown", event => {
      event.preventDefault();
    });

    this._handler = setTimeout(nextPic, 3000);
  }

  unmounted() {}

  update() {}

  appendTo(el) {
    el.appendChild(this._container);
    this.mounted();
  }

  get width() {
    return this[PROPERTY_SYMBOL].width;
  }

  set width(value) {
    this[PROPERTY_SYMBOL].width = value;
  }

  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
    // attribute 单向同步 property
    if (name === "width") {
      this.width = value;
    }
    this[ATTRIBUTE_SYMBOL][name] = value;
  }

  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }

  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) return;
    this[EVENT_SYMBOL][type].delete(listener);
  }

  dispatchEvent(type) {
    if (!this[EVENT_SYMBOL][type]) return;
    for (const event of this[EVENT_SYMBOL][type]) {
      event.call(this);
    }
  }
}
