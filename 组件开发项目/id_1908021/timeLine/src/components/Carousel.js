import TimeLine from '../css-animation-lib/animation/Timeline';
import DOMElementStyleNumberAnimation from '../css-animation-lib/animation/DOMElementStyleNumberAnimation';
import { ease } from '../css-animation-lib/algorithm/CubeBezier';

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

const CLASS_NAME = 'carousel';

const CONFIGS = ['height', 'width', 'imageUrls', 'autoPlay', 'duration', 'speed'];

const EVENTS = ['mousedown', 'mouseup', 'pan', 'paned'];

const Default = {
  duration: 1000,
  autoPlay: true,
  speed: 500
};

/**
 * Carousel
 *
 * @class Carousel
 */
export default class Carousel {
  constructor(configs = {}) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];

    this.created(configs);
  }

  appendTo(element) {
    this.root.style.width = `${this.width || element.offsetWidth}px`;
    this.root.style.height = `${this.height || element.offsetHeight}px`;
    this[ATTRIBUTE_SYMBOL]._container = container;
    this[PROPERTY_SYMBOL].position = 0;
    element.appendChild(this.root);
    this.mounted();
  }

  created(configs) {
    for (const name of CONFIGS) {
      if (configs[name]) {
        this.setAttribute(name, configs[name]);
      } else if (Object.getOwnPropertyNames(Default).indexOf(name) >= 0) {
        this.setAttribute(name, Default[name]);
      }
    }

    this.root = document.createElement('div');
    this.root.classList.add(CLASS_NAME);
    this.createChildren();
  }

  createChildren() {
    const imageUrls = this[PROPERTY_SYMBOL].imageUrls;
    if (imageUrls) {
      let i = imageUrls.length;
      for (let url of imageUrls) {
        let img = document.createElement('img');
        img.src = url;
        img.style.zIndex = i++;
        this.root.appendChild(img);
      }
    }
    this[PROPERTY_SYMBOL].children = this.root.children;
  }

  nextPicture() {
    let position = this[PROPERTY_SYMBOL].position;
    let children = this[PROPERTY_SYMBOL].children;
    this.offsetTimeStart = 0;
    let nextPosition = position + 1;

    nextPosition = nextPosition % children.length;

    let current = (this[PROPERTY_SYMBOL].current = children[position]),
      next = children[nextPosition];
    next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

    this.offsetTimeStart = Date.now();

    this.tl.addAnimation(
      new DOMElementStyleNumberAnimation(
        current,
        'transform',
        0,
        -this.width * position,
        this[PROPERTY_SYMBOL].speed,
        -this.width - this.width * position,
        v => `translateX(${v}px)`
      )
    );

    this.tl.addAnimation(
      new DOMElementStyleNumberAnimation(
        next,
        'transform',
        0,
        this.width - this.width * nextPosition,
        this[PROPERTY_SYMBOL].speed,
        -this.width * nextPosition,
        v => `translateX(${v}px)`
      )
    );

    this.tl.restart();

    position = this[PROPERTY_SYMBOL].position = nextPosition;

    this.nextPictureTimer = setTimeout(() => {
      this.nextPicture();
    }, this[PROPERTY_SYMBOL].duration);
  }

  addAnimation() {
    this.tl = new TimeLine();
    this.nextPicture();
  }

  _addEventListeners() {
    // TODO remove & functional
    let offset = 0;
    this.root.addEventListener('mousedown', event => {
      this.tl.pause();

      let currentTime = Date.now();
      if (currentTime - this.offsetTimeStart < 1000) {
        offset = this.width - ease((currentTime - this.offsetTimeStart) / 1000) * this.width;
      } else {
        offset = 0;
      }

      clearTimeout(this.nextPictureTimer);
    });
  }

  mounted() {
    if (this[PROPERTY_SYMBOL].autoPlay) {
      this.addAnimation();
    }
    this._addEventListeners();
  }

  unmounted() {
    Object.getOwnPropertyNames(this[EVENT_SYMBOL]).forEach(name => {
      this[EVENT_SYMBOL][name].clear();
    });

    this[ATTRIBUTE_SYMBOL] = null;
    this[PROPERTY_SYMBOL] = null;
    this[STATE_SYMBOL] = null;
    this[EVENT_SYMBOL] = null;
  }

  destroy() {
    clearTimeout(this.nextPictureTimer);
    // TODO child = null?
    this[ATTRIBUTE_SYMBOL]._container.removeChild(this.root);
    this.unmounted();
  }

  log() {
    console.log(`width: ${this.width}`);
  }

  get width() {
    //用下划线寸外面还是会访问到

    return this[PROPERTY_SYMBOL].width;
  }

  set width(value) {
    // set return:让语义与 = 赋值相同
    return (this[PROPERTY_SYMBOL].width = value);
  }

  get height() {
    return this[PROPERTY_SYMBOL].height;
  }

  set height(value) {
    return (this[PROPERTY_SYMBOL].height = value);
  }

  get imageUrls() {
    return this[PROPERTY_SYMBOL].imageUrls;
  }

  set imageUrls(value) {
    return (this[PROPERTY_SYMBOL].imageUrls = value);
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  appendChild(childNode) {
    this[PROPERTY_SYMBOL].children.push(childNode);
    childNode.appendTo(this.root);
  }

  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
    this[PROPERTY_SYMBOL][name] = value;
    // if (this[PROPERTY_SYMBOL][name]) {
    //   //   this.triggerEvent('widthChange');
    // }
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

  next() {}

  prev() {}

  setData(urls) {
    this.imageUrls = urls;
  }
}
