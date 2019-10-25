import enableGesture from'./gesture'
const PROPERTY_SYMBOL = Symbol("property"); //名字跟注释差不多，为了调试方便
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Carousel {
  constructor({ el, data, speed, arrow }) {
    this[PROPERTY_SYMBOL] = Object.create(null);//避免找原型链上的同名方法
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
    this._container = document.querySelector(el)
    this._data = data
    // 当前的索引
    this._active_index = 0
    // 移动了多少距离
    this._move_px = 0
    // 用来吸附判断位置的数组
    this._index_arr = data.map((value, index) => -300 * index)
    this._wrapper = document.createElement('div')
    this._speed = speed
    this._arrow = arrow

    this.created();
  }

  appendTo(element) {

  }

  created() {
    this.render()
  }
  mounted() {

  }
  unmounted() {

  }
  update() {

  }
  //切换页面
  move(index) {
    if (index >= 0 && index < this._data.length) {
      console.log('move')
      this._wrapper.style.transition = `transform ${this._speed}ms`
      this._wrapper.style.transform = `translate(-${300 * index}px,0)`
      this._move_px = -300 * index
      this._active_index = index
    }
  }
  render() {
    this._wrapper.classList.add('wrapper')
    this._data.forEach(url => {
      let img = document.createElement('img')
      img.src = url
      this._wrapper.appendChild(img)
    });
    let wrapper=document.createElement('div')
    wrapper.id='container'
    wrapper.appendChild(this._wrapper)
    this._container.appendChild(wrapper)

    if (this._arrow) {
      // 向左按钮
      let left_btn = document.createElement('div')
      left_btn.classList.add('left-btn')
      left_btn.innerText = "<"
      left_btn.addEventListener('click', e => this.move(this._active_index - 1))
      this._container.appendChild(left_btn)
      // 向右按钮
      let right_btn = document.createElement('div')
      right_btn.classList.add('right-btn')
      right_btn.innerText = ">"
      right_btn.addEventListener('click', e => this.move(this._active_index + 1))
      this._container.appendChild(right_btn)
    }

    let pan = e => {
      this._wrapper.style.transition = "transform 0s"
      this._wrapper.style.transform = `translate(${e.dx + this._move_px}px,0)`
    }
    let panend = e => {
      this._move_px = e.dx + this._move_px
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
          if (this._move_px - 150 < this._index_arr[i] && this._move_px - 150 > this._index_arr[i + 1]) {
            index = i
          }
        }
        if (index === undefined) index = this._index_arr.length - 1
        this.move(index)
      }

    }
    enableGesture(this._container)
    this._container.addEventListener('pan', pan)
    this._container.addEventListener('panend', panend)
  }
  get current() {
    return this._active_index
  }
  // get current() {
  //   return this[PROPERTY_SYMBOL].width;
  // }
  // set current(value) {
  //   return this[PROPERTY_SYMBOL].width = value;
  // }
  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name]
  }
  setAttribute(name, value) {
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
    for (let event of this[EVENT_SYMBOL][type])
      event.call(this);
  }
}