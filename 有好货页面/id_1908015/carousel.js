import enableGesture from './gesture'

// 设置 property，外部不可访问，使用 SYMBOL
const PROPERTY_SYMBOL = Symbol("property");
// 使用 symbol 作为对象属性名，永远不会冲突
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export class Carousel {
  constructor(config) {
    // 初始化属性 properties
    // this.width = 1

    // Object.create(null) 创建的对象比 {} 干净，没有 Object 上的各种原型属性
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    // Event
    // this.widthUpdate = null;
    // this.images = config.images;
    // this.width = config.width;
    // this.height = config.height;

    this.setState('position', 0);
    // Lifecycle
    this.created();
  }

  // 方法
  log() {
    console.log(...arguments)
  }

  getState(name) {
    return this[STATE_SYMBOL][name]
  }

  setState(name, value) {
    return this[STATE_SYMBOL][name] = value
  }

  get position() {
    return this.getState('position')
  }

  set position(v) {
    return this.setState('position', v);
  }

  // 属性读写
  get width() {
    return this[PROPERTY_SYMBOL].width;
  }

  set width(v) {
    // 使用以前的值
    // let oldV = this[WIDTH_SYMBOL];
    return this[PROPERTY_SYMBOL].width = v
  }

  get height() {
    return this[PROPERTY_SYMBOL].height;
  }

  set height(v) {
    // 使用以前的值
    // let oldV = this[WIDTH_SYMBOL];
    return this[PROPERTY_SYMBOL].height = v
  }

  get images() {
    return this[PROPERTY_SYMBOL].images;
  }

  set images(v) {
    return this[PROPERTY_SYMBOL].images = v
  }

  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
    if (name === 'width') {
      // 设置 attribute 同步到 property
      this.width = value;
      // 触发事件
      this.triggerEvent('widthChange')
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }

  // Event
  // 一个 type 多个 listener
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set;
    }
    this[EVENT_SYMBOL][type].add(listener);
  }

  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      return;
    }

    // 从 set 删除元素
    this[EVENT_SYMBOL][type].delete(listener);
  }

  triggerEvent(type) {
    if (!this[EVENT_SYMBOL][type]) {
      return;
    }
    for (let event of this[EVENT_SYMBOL][type]) {
      event.call(this);
    }
  }

  appendTo(ele) {
    ele.appendChild(this.root);
    this.mounted();
    this.render();
  }

  // LifeCycle
  created() {
    this.root = document.createElement("div");
    this.root.classList.add('carousel');
    // this.root.style.width = this.width + 'px';
    // this.root.style.height = this.height + 'px';
    this.root.style.overflow = 'hidden';
    this.root.style.outline = '1px solid blue';
    this.root.style.whiteSpace = 'nowrap';


    // this.root.style.backgroundColor = "yellow";
    // this[STATE_SYMBOL].h = 0; // 色相
    // this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
  }
  mounted() {
    this.root.addEventListener("click", () => {
      this[STATE_SYMBOL].h += 30;
      this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
    })
  }
  unmounted() {}
  update() {}
  destoryed() {}

  render() {
    this.root.style.width = this.width + 'px';
    this.root.style.height = this.height + 'px';

    for (let i of this.images) {
      let e = document.createElement('img');
      e.src = i;
      e.style.width = '100%';
      e.style.height = '100%';
      e.style.display = 'inline-block';
      e.style.transition = 'ease 0.5s';

      this.root.appendChild(e);
    }

    let children = Array.prototype.slice.call(this.root.children);
    let x = 0;

    enableGesture(this.root);
    this.root.addEventListener('pan', event => {
      if (event.isVertical) {
        return;
      }
      for (let child of children) {
        child.style.transition = "ease 0s";
        child.style.transform = `translateX(${event.dx + x}px`;
      }
    });

    this.root.addEventListener("panend", event => {
      if(event.isVertical)
        return;
      if(event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)){
        if(event.dx > 0) {
          this.position = this.position - 1;
        }
        if(event.dx < 0) {
          this.position = this.position + 1;
        }
      } else {
        this.position = -(Math.round((x + event.dx) / this.width));
      }

      this.position = Math.max(0, Math.min(this.position, children.length - 1));

      for(let child of children) {
        child.style.transition = "";
        child.style.transform = `translate(${-this.position * this.width}px)`;
      }
      x = -this.position * this.width;
    });

    this.root.addEventListener("mousedown", event => event.preventDefault());
  }
}
