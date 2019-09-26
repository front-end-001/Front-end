// 要认真写 symbol 的名字，跟注释差不多的作用
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');

class Carousel {
  // 属性要在 constructor 里面写
  constructor() {
    // 存 attribute 和 property 一定要用纯净的对象
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);

    this.onWidthChange = null;
  }
  // 监听属性的变动
  get width() {
    // 怎么存属性才能不让在外部获取到呢？用 symbol
    return this[PROPERTY_SYMBOL].width;
  }
  // 设置属性
  set width(value) {
    // 使 return 与 = 语义相同
    return this[PROPERTY_SYMBOL].width = value;
  }
  // 方法
  log() {
    // 获取属性
    console.log('width', this.width);
  }
  // attribute 特性
  getAttriute(name) {
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    if (name == 'width') {
      this.width = value;
      // this.log();
      // if (this.onWidthChagne)
        // this.onWidthChagne();
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }
  addEventListener(type, listener) {
    // 创建一个容器来存放事件
    if (!this[EVENT_SYMBOL][type]) {
      // this[EVENT_SYMBOL][type] = [];
      this[EVENT_SYMBOL][type] = new Set();
    }
    // this[EVENT_SYMBOL][type].push(listener);
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventLister(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      throw new Error('no such event')
      // 或
      return;
    }
    // 方法一
    // let events = this[EVENT_SYMBOL][type];
    // for (let i = 0; i < events.length; i++) {
    //   if (events[i] == listener) {
    //     // this[EVENT_SYMBOL][type].splice(i, 1);
    //     // o(1) 删除元素
    //     let tmp = events[i];
    //     events[events.length - 1] = events[i];
    //     events[i] = tmp;
    //     events.pop();
    //   }
    // }
    // 方法二
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    for (let event of this[EVENT_SYMBOL][type]) {
      event.call(this, type);
    }
  }
}

var c = new Carousel();
console.log(c.a);
c.width = 1;
c.log();
c.onWidthChange = function() {
  console.log(this.width);
}
c.onWidthChange();
c.addEventListener('foo', () => {
  console.log(34234);
})
console.log(c);
c.triggerEvent('foo');
c.removeEventLister('foo')
console.log(c);
c.triggerEvent('foo');