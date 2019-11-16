import enableGesture from '../until/gesture'

const PROPERTY_SYMBOL = Symbol("property"); //名字跟注释差不多，为了调试方便
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Carousel {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);//避免找原型链上的同名方法
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    // 移动了多少像素
    this._move_px = 0
    // 当前显示的索引
    this._active_index = 0
    this._width = 0
    this._speed = 300
    this._data = []

    this.created();
  }

  appendTo(element) {
    element.appendChild(this._root);
    this._width = this._root.offsetWidth
    this._index_arr = this._data.map((value, index) => -this._width * index)
    this.mounted();
  }

  created() {
    this._root = document.createElement("div");
    this._root.className = "carousel_root"
    this._root.style.overflow = "hidden"
    this._wrapper = document.createElement("div");
    this._wrapper.className = "carousel_wrapper"
    this._wrapper.style.display = "flex"
    this._wrapper.style.flexWrap = "nowrap"
    this._root.appendChild(this._wrapper)

    let pan = e => {
      if (Math.abs(e.dy) < 10) {
        this._wrapper.style.transition = "transform 0s"
        this._wrapper.style.transform = `translate(${e.dx + this._move_px}px,0)`
      }
    }
    let panend = e => {
      this._move_px = e.dx + this._move_px
      console.error(this._move_px)
      console.log(e)
      if (e.isFlick) {
        if (e.dx > 0) {
          this.move(this._active_index - 1)
        }
        if (e.dx < 0) {
          this.move(this._active_index + 1)
        }
      } else {
        // 搞一个自动吸附的效果
        let index
        for (let i = 0; i < this._index_arr.length; i++) {
          if (this._move_px - this._width / 2 < this._index_arr[i] && this._move_px - this._width / 2 > this._index_arr[i + 1]) {
            index = i
          }
        }
        if (index === undefined) index = this._index_arr.length - 1
        this.move(index)
      }
    }
    enableGesture(this._root)
    this._root.addEventListener('pan', pan)
    this._root.addEventListener('panend', panend)
  }
  mounted() {
    this._width = this._root.offsetWidth
  }
  unmounted() {

  }
  update() {

  }
  appendChild(child) {
    let arr = []
    if (!Array.isArray(child)) {
      arr.push(child)
    } else {
      arr = child
    }
    arr.forEach(item => {
      item._root.style = "width:100%;flex:0 0 auto;"
      item.appendTo(this._wrapper)
      this._data.push(item)
    })
  }
  //切换页面
  move(index) {
    console.log('move')
    this.triggerEvent('move')
    if (index >= 0 && index < this._data.length) {
      this._wrapper.style.transition = `transform ${this._speed}ms`
      this._wrapper.style.transform = `translate(-${this._width * index}px,0)`
      this._move_px = -this._width * index
      this._active_index = index
    } else {
      if (index < 0) {
        this._wrapper.style.transition = `transform ${this._speed}ms`
        this._wrapper.style.transform = `translate(0px,0)`
        this._move_px = 0
        this._active_index = 0
      } else if (index >= this._data.length) {
        this._wrapper.style.transition = `transform ${this._speed}ms`
        this._wrapper.style.transform = `translate(-${this._width * (index - 1)}px,0)`
        this._move_px = -this._width * (index - 1)
        this._active_index = index - 1
      }
    }

  }
  log() {
    console.log("width:", this.width);
  }

  get width() {
    return this[PROPERTY_SYMBOL].width;
  }
  set width(value) {
    return this[PROPERTY_SYMBOL].width = value; //返回结果 和c系语言保持一致
  }
  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name]
  }
  setAttribute(name, value) {
    if (name == "style") {
      this._root.style = value
    }
    if (name == "className") {
      this._root.classList.add(value)
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type])
      this[EVENT_SYMBOL][type] = new Set;
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type])
      return;
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    if (!this[EVENT_SYMBOL][type])
      return;
    for (let event of this[EVENT_SYMBOL][type])
      event.call(this);
  }
}