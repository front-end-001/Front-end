const data = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
];

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("color");

export default class Carousel {
  constructor({
    container,
    duration = 3000, // porp
    elementWidth = 500, // prop
    transitionMethod = linear,
    transitionDuration = 500, //
    urls = data
  } = {}) {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[ATTRIBUTE_SYMBOL].container = container;
    this[ATTRIBUTE_SYMBOL].content = null;
    this[ATTRIBUTE_SYMBOL].duration = duration;
    this[ATTRIBUTE_SYMBOL].elementWidth = elementWidth;
    this[ATTRIBUTE_SYMBOL].transitionMethod = transitionMethod;
    this[ATTRIBUTE_SYMBOL].transitionDuration = transitionDuration;
    this[ATTRIBUTE_SYMBOL].urls = urls;

    this[PROPERTY_SYMBOL].container = container;
    this[PROPERTY_SYMBOL].content = null;
    this[PROPERTY_SYMBOL].duration = duration;
    this[PROPERTY_SYMBOL].elementWidth = elementWidth;
    this[PROPERTY_SYMBOL].transitionMethod = transitionMethod;
    this[PROPERTY_SYMBOL].transitionDuration = transitionDuration;
    this[PROPERTY_SYMBOL].urls = urls;

    this[STATE_SYMBOL].timeline = new Timeline();
    this[STATE_SYMBOL].position = 0;
    this[STATE_SYMBOL].offsetTimeStart = 0;
    this[STATE_SYMBOL].currentTime = 0;
    this[STATE_SYMBOL].offset = 0;

    this.created();
  }

  log(name) {
    console.log(
      "width:",
      this[PROPERTY_SYMBOL][name],
      this[ATTRIBUTE_SYMBOL][name]
    );
  }

  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
    this[PROPERTY_SYMBOL][name] = value;
    this.dispatchEvent(name);
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }

  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }

  removeEventListener(type, listener) {
    const events = this[EVENT_SYMBOL][type];
    if (events) {
      events.delete(listener);
    }
  }

  dispatchEvent(type) {
    const events = this[EVENT_SYMBOL][type];
    for (let event of events) {
      event.call(this);
    }
  }

  appendTo(element) {
    this[PROPERTY_SYMBOL].container = element;
    element.appendChild(this[STATE_SYMBOL].content);
    this.mounted();
  }

  positionOf(element) {
    let position = element.style.transform.match(/\((.*?)\)/g)[0];
    if (position.slice(position.length - 2, position.length - 1) === "%") {
      return (
        (parseInt(position.slice(1, position.length - 2)) *
          this[PROPERTY_SYMBOL].elementWidth) /
        100
      );
    } else if (
      position.slice(position.length - 3, position.length - 1) === "px"
    ) {
      return parseInt(position.slice(1, position.length - 3));
    } else console.log("positionOf error, positoin=", position);
  }

  createChildren() {
    const elementFragment = document.createDocumentFragment();
    for (let d in this[PROPERTY_SYMBOL].urls) {
      let e = document.createElement("img");
      e.src = this[PROPERTY_SYMBOL].urls[d];
      e.style.transform = `translate(0px)`;
      if (
        parseInt(d) === this[PROPERTY_SYMBOL].urls.length - 1 &&
        this[PROPERTY_SYMBOL].urls.length > 2
      ) {
        e.style.transform = `translate(-${this[PROPERTY_SYMBOL].elementWidth *
          (1 + parseInt(d))}px)`;
      }
      elementFragment.appendChild(e);
    }
    this[STATE_SYMBOL].content = elementFragment;
  }

  nextFrame(i = 1) {
    const { elementWidth, transitionDuration, transitionMethod } = this[
      PROPERTY_SYMBOL
    ];
    const children = Array.from(this[PROPERTY_SYMBOL].container.children);
    const { position, timeline } = this[STATE_SYMBOL];
    let current = children[position];
    let nextPosition = (position + 1) % children.length;
    let next = children[nextPosition];
    let nextNextPosition = (nextPosition + 1) % children.length;
    let nextNext = children[nextNextPosition];
    this[STATE_SYMBOL].offsetTimeStart = Date.now();
    timeline.clearAnimations();
    if (i === -1) {
      current.style.transform = `translate(${-elementWidth -
        elementWidth * position}px)`;
    } else {
      let currentPo = this.positionOf(current);
      let currentDis =
        Math.abs(-elementWidth - elementWidth * position - currentPo) /
        elementWidth;
      this[STATE_SYMBOL].timeline.addAnimation(
        new DOMElementStyleNumberAnimation(
          current,
          "transform",
          0,
          currentPo,
          currentDis * transitionDuration,
          -elementWidth - elementWidth * position,
          transitionMethod,
          v => `translateX(${v}px)`
        )
      );
    }
    if (i === 1) {
      nextNext.style.transform = `translate(${elementWidth -
        elementWidth * nextNextPosition}px)`;
    } else {
      let nextNextPo = this.positionOf(nextNext);
      let nextNextDis =
        Math.abs(elementWidth - elementWidth * nextNextPosition - nextNextPo) /
        elementWidth;
      timeline.addAnimation(
        new DOMElementStyleNumberAnimation(
          nextNext,
          "transform",
          0,
          nextNextPo,
          nextNextDis * transitionDuration,
          elementWidth - elementWidth * nextNextPosition,
          transitionMethod,
          v => `translateX(${v}px)`
        )
      );
    }
    let nextPo = this.positionOf(next);
    let nextDis =
      Math.abs(-elementWidth * nextPosition - nextPo) / elementWidth;
    timeline.addAnimation(
      new DOMElementStyleNumberAnimation(
        next,
        "transform",
        0,
        nextPo,
        transitionDuration * nextDis,
        -elementWidth * nextPosition,
        transitionMethod,
        v => `translateX(${v}px)`
      )
    );
    timeline.restart();
    this[STATE_SYMBOL].position = nextPosition;
    this._handler = setTimeout(() => {
      this.nextFrame();
    }, this[PROPERTY_SYMBOL].duration);
  }

  onPan(event) {
    if (event.isVertical) return;
    const { timeline, offsetTimeStart, position } = this[STATE_SYMBOL];
    const {
      transitionDuration,
      transitionMethod,
      currentTime,
      elementWidth,
      container
    } = this[PROPERTY_SYMBOL];
    if (timeline.status !== "paused") {
      timeline.pause();
      clearTimeout(this._handler);
      delete this._handler;
      this[STATE_SYMBOL].currentTime = Date.now();
      if (this[STATE_SYMBOL].currentTime - offsetTimeStart < transitionDuration)
        this[STATE_SYMBOL].offset =
          (1 -
            transitionMethod(
              (currentTime - offsetTimeStart) / transitionDuration
            )) *
          elementWidth;
      else this[STATE_SYMBOL].offset = 0;
    }
    const children = Array.from(container.children);
    let current = children[position];
    let nextPosition = (position + 1) % children.length;
    let next = children[nextPosition];
    let previousPosition = (position + children.length - 1) % children.length;
    let previous = children[previousPosition];
    current.style.transform = `translate(${-position * elementWidth +
      event.dx +
      this[STATE_SYMBOL].offset}px`;
    next.style.transform = `translate(${elementWidth -
      elementWidth * nextPosition +
      event.dx +
      this[STATE_SYMBOL].offset}px)`;
    previous.style.transform = `translate(${elementWidth *
      (-1 - previousPosition) +
      event.dx +
      this[STATE_SYMBOL].offset}px)`;
  }

  onPanend(event) {
    let condition = 0;
    const { elementWidth } = this[PROPERTY_SYMBOL];
    const { position, offset } = this[STATE_SYMBOL];
    if (event.isVertical) return;
    if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
      condition = event.dx < 0 ? 1 : -1;
    } else {
      let x = event.dx;
      condition = x < -elementWidth / 2 ? 1 : x > elementWidth / 2 ? -1 : 0;
    }

    this[STATE_SYMBOL].position =
      offset < elementWidth
        ? (position - 1 + 4 + condition) % 4
        : (position - 2 + 4 + condition) % 4;
    this.nextFrame(condition);
  }

  created() {
    this.createChildren();
    // this.appendTo(this[PROPERTY_SYMBOL].container);
  }

  mounted() {
    this._handler = setTimeout(() => {
      this.nextFrame();
    }, this[PROPERTY_SYMBOL].duration);
    enableGesture(this[PROPERTY_SYMBOL].container);
    this[PROPERTY_SYMBOL].container.addEventListener(
      "pan",
      this.onPan.bind(this)
    );
    this[PROPERTY_SYMBOL].container.addEventListener(
      "panend",
      this.onPanend.bind(this)
    );
    this[PROPERTY_SYMBOL].container.addEventListener("mousedown", event =>
      event.preventDefault()
    );
  }
}
