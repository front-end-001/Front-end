// Symbol es6语法 独一无二的值 私有
const PROPERTY_SYMBOL = Symbol('property')//js
const ATTRIBUTE_SYMBOL = Symbol('attribute')//html
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')
class Carousel {
  constructor(config){
    this[PROPERTY_SYMBOL] = Object.create(null)
    this[ATTRIBUTE_SYMBOL] = Object.create(null)
    this[EVENT_SYMBOL] = Object.create(null)
    this[STATE_SYMBOL] = Object.create(null)
    this.created();
  }
  appendTo(element){
    element.appendChild(this.root)
    this.mounted()
  }
  //生命周期
  created(){
    //创建的时候
    this.root = document.createElement('div')
    this.root.style.width = '300px'
    this.root.style.height = '300px'
    this.root.style.backgroundColor = 'red'
    this[STATE_SYMBOL].h = 0
    //变色hsl  0-360 色相
    this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h},60%,70%)`
  }
  mounted(){
    this.root.addEventListener('click', ()=>{
      this[STATE_SYMBOL].h += 30;
      this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h},60%,70%)`
    })
  }
  unmounted() {
  }
  update(){
  }
  log(){
    console.log('width', this.width)
  }
  // 订阅property的变化
  get width(){
    return this[PROPERTY_SYMBOL].width
  }
  set width(value){
    return this[PROPERTY_SYMBOL].width = value
  }
  getAttribute(name){
    return this[ATTRIBUTE_SYMBOL][name]
  }
  setAttribute(name, value){
    if(name === 'width'){
      this.width = value
      //this.log()
      this.triggerEvent('widthchange')
    }
    return [ATTRIBUTE_SYMBOL][name] = value
  }
  addEventListener(type,listener){
    //是否多个事件
    if(!this[EVENT_SYMBOL][type]){
      //set的用法
     //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set
      this[EVENT_SYMBOL][type] = new Set
      this[EVENT_SYMBOL][type].add(listener)
    }
  }
  removeEventListener(type,listener){
    if(!this[EVENT_SYMBOL][type]){
      return
    }
    //从数组里面删除元素
    this[EVENT_SYMBOL][type].delete(listener)
  }
  //触发事件
  triggerEvent(type){
    for(let event of this[EVENT_SYMBOL][type]){
      event.call(this)
    }
  }
}
module.exports = {Carousel}
