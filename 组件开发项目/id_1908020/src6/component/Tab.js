import Carousel from './Carousel'

const PROPERTY_SYMBOL = Symbol("property"); //名字跟注释差不多，为了调试方便
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Tab {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);//避免找原型链上的同名方法
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this._child=[]
    this._header_item=[]
    this.created();
  }

  appendTo(element) {
    element.appendChild(this._root);
    this._body._width = this._body._root.offsetWidth
    this.mounted();
  }

  created() {
    this._root = document.createElement("div");
    this._root.className='tab_header'
    this._header = document.createElement("div");
    this._header.className='tab_item'
    this._header.style.display="flex"
    this._body = new Carousel();
    this._root.appendChild(this._header)
  }
  mounted() {
    this._child.forEach((child,index)=>{
      let item=this.creteTitle(child.getAttribute("title"),index)
      this._header_item.push(item)
      this._header.appendChild(item)
      child.mounted()
    })
    this._header_item[0].classList.add('active')
  }
  unmounted() {

  }
  update() {

  }
  creteTitle(title,index){
    let div = document.createElement("div")
    div.innerText=title
    div.addEventListener('click',e=>{
      this._header_item.forEach(item=>item.classList.remove('active'))
      div.classList.add('active')
      this._body.move(index)
    })
    return div
  }
  appendChild(child) {
    console.log(child)
    let arr=[]
    if (!Array.isArray(child)) {
      this._child.push(child)
      arr.push(child)
    }
    arr.forEach((item,index) => {
      // console.error(item.getAttribute("title"))
      
      this._body.appendChild(item)
      // item.appendTo(this._body)
    })

    this._body.appendTo(this._root)

  }

  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name]
  }
  setAttribute(name, value) {
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