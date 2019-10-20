const ATTRIBUTE_SYMBOL = Symbol('attribute')
const PROPERTY_SYMBOL = Symbol('property')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

export default class Div {
  constructor(type) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null)
    this[PROPERTY_SYMBOL] = Object.create(null)
    this[EVENT_SYMBOL] = Object.create(null)
    this[STATE_SYMBOL] = Object.create(null)

    this[PROPERTY_SYMBOL].children = []

    this.root = document.createElement(type)
  }

  appendTo(element) {
    element.appendChild(this.root)
  }

  appendChild(child) {
    this.children.push(child)
    child.appendTo(this.root)
  }

  get children() {
    return this[PROPERTY_SYMBOL].children
  }

  getAttribute(name) {
    return this.root.getAttribute(name)
  }

  setAttribute(name, value) {
    if (name == 'style'&& typeof value == 'object'){
      for(let p in value){
        console.log(p,value[p])
        this.root.style[p]=value[p]
      }
    }
    
    console.log(this.root.style)
    this.root.setAttribute(name, value)
  }

  addEventListener() {
    this.root.addEventListener(...arguments)
  }
  removeEventListener() {
    this.root.removeEventListener(...arguments)
  }
}
