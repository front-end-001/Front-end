import "../carousel.scss";
import enableGesture from "./gesture";

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
    /* eslint-disable */
    const nextFrame = () => {
      const nextPosition = (position + 1) % children.length;
      const [current, next] = [children[position], children[nextPosition]];
      // 矫正下一张的位置
      next.style.transition = "ease 0s";
      next.style.transform = `translate(
        ${this._width - this._width * nextPosition}px
      )`;

      setTimeout(() => {
        current.style.transform = `translate(
          ${-this._width - this._width * position}px
        )`;
        position = nextPosition;
        next.style.transition = "";
        next.style.transform = `translate(${-this._width * nextPosition}px)`;
        position = nextPosition;
      }, 16);

      this._handler = setTimeout(nextFrame, 3000);
    };

    enableGesture(this._container);
    let x = 0;
    this._container.addEventListener("tap", () => {
      console.log("tap");
    });
    this._container.addEventListener("pressstart", () => {
      console.log("pressstart");
    });
    this._container.addEventListener("pressend", () => {
      console.log("pressend");
    });
    this._container.addEventListener("presscancel", () => {
      console.log("presscancel");
    });
    this._container.addEventListener("pan", event => {
      if (event.isVertical) return;
      for (const child of children) {
        child.style.transition = "ease 0s";
        child.style.transform = `translateX(${event.dx + x}px)`;
      }
    });

    this._container.addEventListener("panend", event => {
      if (event.isVertical) return;
      if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
        if (event.dx > 0) {
          position -= 1;
        } else {
          position += 1;
        }
      } else {
        position = -Math.round((x + event.dx) / this._width);
      }
      // 处理越界
      position = Math.min(children.length - 1, Math.max(position, 0));
      for (const child of children) {
        child.style.transition = "ease 0.5s";
        child.style.transform = `translate(${-position * this._width}px)`;
      }

      x = -position * this._width;
    });

    this._container.addEventListener("mousedown", event => {
      event.preventDefault();
    });

    // this._handler = setTimeout(nextFrame, 3000);
  }
}

const carousel = new Carousel(document.getElementById("app"));
carousel.render();
