const WIDTH_SYMBOL = Symbol("width");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export class Carousel {
  constructor(data) {
    this[WIDTH_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this.setAttribute("data", data);

    this.created();
  }

  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
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
    for (let event of this[EVENT_SYMBOL][type]) {
      event.call(this);
    }
  }

  appendTo(element) {
    element.appendChild(this._container);
    this.mounted();
  }

  created() {
    this._container = document.createElement("div");
    this._container.classList.add("carousel");
    this._handler = null;
    this.data = this.getAttribute("data");
    console.log(this.data);
  }

  mounted() {
    let i = this.data.length;
    for (let image of this.data) {
      let e = document.createElement("img");
      e.src = image;
      e.style.zIndex = i--;
      this._container.appendChild(e);
    }

    let children = Array.prototype.slice.call(this._container.children);

    let position = 0;

    let offsetTimeStart = 0;

    var tl = new Timeline();

    let nextPic = () => {
      let nextPosition = position + 1;
      nextPosition = nextPosition % children.length;

      let [current, next] = [children[position], children[nextPosition]];

      offsetTimeStart = Date.now();

      next.style.transform = `translate(${500 - 500 * nextPosition}px)`;

      console.log("current: ", position, current.style.transform);
      console.log("next: ", nextPosition, next.style.transform);
      console.log("");

      tl.restart();

      tl.addAnimation(
        new DOMElementStyleElemAnimation(
          current,
          "transform",
          0,
          -500 * position,
          1000,
          -500 - 500 * position,
          v => `translateX(${v}px)`
        )
      );

      tl.addAnimation(
        new DOMElementStyleElemAnimation(
          next,
          "transform",
          0,
          500 - 500 * nextPosition,
          1000,
          -500 * nextPosition,
          v => `translateX(${v}px)`
        )
      );

      position = nextPosition;

      nextPicTimer = setTimeout(nextPic, 3000);
    };

    let nextPicTimer = setTimeout(nextPic, 3000);

    let offset = 0;
    this._container.addEventListener("mousedown", event => {
      tl.pause();

      let currentTime = Date.now();

      if (currentTime - offsetTimeStart < 1000) {
        offset = 500 - ease((currentTime - offsetTimeStart) / 1000) * 500;
      } else {
        offset = 0;
      }

      console.log("offset: ", offset);

      clearTimeout(nextPicTimer);
    });

    enableGesture(this._container);

    this._container.addEventListener("pan", event => {
      console.log("pan");
      if (event.isVertical) return; // 如果垂直分量大，就不移动

      let current = children[position];

      let nextPosition = (position + 1) % children.length;
      let lastPosition = (children.length + position - 1) % children.length; // 避免小数，因此补一个length的block

      let next = children[nextPosition];
      let last = children[lastPosition];

      last.style.transition = "ease 0s";
      last.style.transform = `translate(${-500 -
        500 * lastPosition +
        event.dx +
        offset}px)`;

      current.style.transition = "ease 0s";
      current.style.transform = `translate(${-500 * position +
        event.dx +
        offset}px)`;

      next.style.transition = "ease 0s";
      next.style.transform = `translate(${500 -
        500 * nextPosition +
        event.dx +
        offset}px)`;
    });

    this._container.addEventListener("panend", event => {
      if (event.isVertical) return;

      console.log("original postion: ", position);

      let isLeft;
      if (event.isFlick && event.isHorizontal) {
        if (event.dx > 0) {
          position = position - 1;
          isLeft = true;
        }
        if (event.dx < 0) {
          position = position + 1;
          isLeft = false;
        }
      } else {
        if (event.dx > 250) {
          position = position - 1;
          isLeft = true;
        } else if (event.dx < -250) {
          position = position + 1;
          isLeft = false;
        } else if (event.dx > 0) {
          isLeft = false;
        } else {
          isLeft = true;
        }
      }

      position = (children.length + position) % children.length;

      console.log("new postion: ", position);

      let current = children[position];

      let nextPosition = (position + 1) % children.length;
      let lastPosition = (children.length + position - 1) % children.length; // 避免小数，因此补一个length的block

      let next = children[nextPosition];
      let last = children[lastPosition];
      /*
       *
       * [0,1,2,3]
       * 这里的 current 假设为0， last为3 ,next 为1， 那需要图片放到 正确的 last，cur，next位置
       * 则需要 3 移动到 0 的左边， 即-2000的位置， 而 1 本来就在 0  的右边，则不需要移动
       *
       */

      if (!isLeft) {
        // 如果左边的不进入，则不用进行transition
        last.style.transition = "";
      } else {
        last.style.transition = "ease 0s";
      }
      last.style.transform = `translate(${-500 - 500 * lastPosition}px)`;

      current.style.transition = "ease 0s";
      current.style.transform = `translate(${-500 * position}px)`;

      if (isLeft) {
        next.style.transition = "";
      } else {
        next.style.transition = "ease 0s";
      }
      next.style.transform = `translate(${500 - 500 * nextPosition}px)`;
    });

    this._container.addEventListener("mousedown", event =>
      event.preventDefault()
    );
    this._container.addEventListener("pressstart", event => {
      console.log("pressstart");
    });

    this._container.addEventListener("pressend", event => {
      console.log("pressend");
    });

    this._container.addEventListener("presscancel", event => {
      console.log("presscancel");
    });
  }

  unmounted() {}

  update() {}
}
