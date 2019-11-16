import "../carousel.scss";

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

    let startX;
    let startTransform;
    const move = event => {
      console.log("move");
      event.preventDefault();
      for (const child of children) {
        child.style.transition = "ease 0s";
        child.style.transform = `translate(
          ${startTransform + event.clientX - startX}px
        )`;
      }
    };

    const end = event => {
      console.log("end");
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", end);
      position = -Math.round(
        (startTransform + event.clientX - startX) / this._width
      );
      // 处理越界
      position = Math.min(children.length - 1, Math.max(position, 0));
      for (const child of children) {
        child.style.transition = "ease 0.5s";
        child.style.transform = `translate(${-position * this._width}px)`;
      }
    };
    const start = event => {
      console.log("start");
      event.preventDefault();
      startX = event.clientX;
      startTransform = -position * this._width;
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", end);
    };

    this._container.addEventListener("mousedown", start);

    // this._handler = setTimeout(nextFrame, 3000);
  }
}

const carousel = new Carousel(document.getElementById("app"));
carousel.render();
