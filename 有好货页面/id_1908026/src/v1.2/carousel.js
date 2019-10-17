import "../carousel.scss";
import { ease } from "./cubicBezier";
import enableGesture from "./gesture";
import Timeline from "./Timeline";
import DOMElementStyleNumberAnimation from "./DOMElementStyleNumberAnimation";

const data = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

class Carousel {
  constructor(container) {
    this._container = container;
    this._container.classList.add("carousel");
    this._width = Number(getComputedStyle(container).width.replace("px", ""));
  }

  render() {
    for (const url of data) {
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
      console.log(offsetTimeStart, currentTime);
      console.log(currentTime - offsetTimeStart);
      if (currentTime - offsetTimeStart < 500) {
        offset = 500 - ease((currentTime - offsetTimeStart) / 500) * 500;
        console.log(offset);
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
        console.log(offset);
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
      console.log(event.dx);
      console.log(offset);

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
}

const carousel = new Carousel(document.getElementById("app"));
carousel.render();
