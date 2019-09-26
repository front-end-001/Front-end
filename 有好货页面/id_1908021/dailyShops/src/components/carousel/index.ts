import TimeLine from '../../../lib/css-animation-lib/animation/Timeline';
import DOMElementStyleNumberAnimation from '../../../lib/css-animation-lib/animation/DOMElementStyleNumberAnimation';
import { ease } from '../../../lib/css-animation-lib/algorithm/CubeBezier';
import BaseComponent from '../Base/BaseComponent';

const CLASS_NAME = 'carousel';

const CONFIGS = ['imageUrls', 'autoPlay', 'duration', 'speed'];

const EVENTS = ['mousedown', 'mouseup', 'pan', 'paned'];

// TODO 要具体列出来
interface Config {
  [key: string]: any;
}

const defaultConfig: Config = {
  duration: 3000,
  autoPlay: true,
  speed: 1000
};

/**
 * Carousel
 *
 * @class Carousel
 */
export default class Carousel extends BaseComponent {
  constructor(configs = {}) {
    super();
    this.ATTRIBUTE.configs = configs;
    this.created();
  }

  appendTo(element: HTMLDivElement) {
    if (this.root) {
      this.ATTRIBUTE._container = element;
      this.PROPERTY.position = 0;
      element.appendChild(this.root);
      this.mounted();
    }
  }

  created() {
    const configs = this.ATTRIBUTE.configs;
    for (const name of CONFIGS) {
      if (configs[name]) {
        this.setAttribute(name, configs[name]);
      } else if (Object.getOwnPropertyNames(defaultConfig).indexOf(name) >= 0) {
        this.setAttribute(name, defaultConfig[name]);
      }
    }

    this.root = document.createElement('div');
    this.root.classList.add(CLASS_NAME);
  }

  createChildren() {
    console.log(this.PROPERTY.imageUrls);
    const imageUrls = this.PROPERTY.imageUrls;
    if (imageUrls && this.root) {
      let i = imageUrls.length;
      for (let url of imageUrls) {
        let img = document.createElement('img');
        img.src = url;
        img.style.zIndex = '' + i++;
        this.root.appendChild(img);
      }
      this.PROPERTY.children = this.root.children;
    }
  }

  nextPicture() {
    if (!this.root) return;
    let position = this.PROPERTY.position;
    let children = this.PROPERTY.children;
    this.PROPERTY.offsetTimeStart = 0;
    let nextPosition = position + 1;

    nextPosition = nextPosition % children.length;

    let current = (this.PROPERTY.current = children[position]),
      next = children[nextPosition];

    this.PROPERTY.offsetTimeStart = Date.now();
    console.log(this.PROPERTY.speed)

    this.PROPERTY.tl.addAnimation(
      new DOMElementStyleNumberAnimation(
        current,
        'transform',
        0,
        -this.width * position,
        this.PROPERTY.speed,
        -this.width - this.width * position,
        v => `translateX(${v}px)`
      )
    );

    this.PROPERTY.tl.addAnimation(
      new DOMElementStyleNumberAnimation(
        next,
        'transform',
        0,
        this.width - this.width * nextPosition,
        this.PROPERTY.speed,
        -this.width * nextPosition,
        v => `translateX(${v}px)`
      )
    );

    this.PROPERTY.tl.restart();

    position = this.PROPERTY.position = nextPosition;

    this.PROPERTY.nextPictureTimer = setTimeout(() => {
      this.nextPicture();
    }, this.PROPERTY.duration);
  }

  addAnimation() {
    this.PROPERTY.tl = new TimeLine();
    this.nextPicture();
  }

  _addEventListeners() {
    // TODO remove & functional
    let offset = 0;
    if (this.root) {
      this.root.addEventListener('mousedown', event => {
        this.PROPERTY.tl.pause();

        let currentTime = Date.now();
        if (currentTime - this.PROPERTY.offsetTimeStart < 1000) {
          offset =
            this.width - ease((currentTime - this.PROPERTY.offsetTimeStart) / 1000) * this.width;
        } else {
          offset = 0;
        }

        clearTimeout(this.PROPERTY.nextPictureTimer);
      });
    }
  }

  mounted() {
    if (this.PROPERTY.autoPlay) {
      this.addAnimation();
    }
    // this._addEventListeners();
  }

  destroy(): void {
    clearTimeout(this.PROPERTY.nextPictureTimer);
    // TODO child = null?
    this.ATTRIBUTE._container.removeChild(this.root);
    this.unmounted();
  }

  get width(): number {
    //用下划线寸外面还是会访问到
    return this.PROPERTY.width;
  }

  set width(value: number) {
    // set return:让语义与 = 赋值相同
    this.PROPERTY.width = value;
  }

  get height(): number {
    return this.PROPERTY.height;
  }

  set height(value) {
    this.PROPERTY.height = value;
  }

  get imageUrls(): string[] {
    return this.PROPERTY.imageUrls;
  }

  set imageUrls(value) {
    this.PROPERTY.imageUrls = value;
  }

  get children(): HTMLDivElement {
    return this.PROPERTY.children;
  }

  appendChild(childNode: any): void {
    this.PROPERTY.children.push(childNode);
    childNode.appendTo(this.root);
  }

  setData(urls: string[]): void {
    this.imageUrls = urls;
  }

  next() {}

  prev() {}

  setAttribute(name: string, value: any): any {
    super.setAttribute(name, value);
    if (name === 'imageUrls') {
      this.createChildren();
    }

    // 处理style Attributes
    // HTMLElement.setAttribute是一个异步方法
    // 这里用setTimout保证通过height/width attributes设置的样式不会被style里的所覆盖
    setTimeout(() => {
      let valueStr = value;
      if (typeof value !== 'string') {
        valueStr = value + 'px';
      }
      if (name === 'height' && this.root) {
        this.root.style.height = valueStr;
      } else if (name === 'width' && this.root) {
        this.root.style.width = valueStr;
      }
    }, 0);
  }
}
