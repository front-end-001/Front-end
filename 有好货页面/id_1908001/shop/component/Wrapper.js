const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol("property")
const EVENT_SYMBOL = Symbol("property")
export default class Wrapper {
    constructor(type) {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this.container = document.createElement(type)
    }
    appendTo (body) {
        body.appendChild(this.container)
    }
    appendChild(child){
        this.children.push(child)
        child.appendTo(this.container)
    }
    get children(){
        return this[PROPERTY_SYMBOL].children || []
    }
    setAttribute (name, value) {
        this.container.setAttribute(name, value)
    }
    getAttribute (name) {
        return this.container.getAttribute(name)
    }
    addEventListener(type, listener){
        this.container.addEventListener(type, listener)
    }
    removeEventListener(type, listener){
        this.container.removeEventListener(type, listener)
    }
}
