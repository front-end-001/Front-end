

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Wrapper {
    constructor(type) {
        this.ATTRIBUTE_SYMBOL = Object.create(null)
        this.PROPERTY_SYMBOL = Object.create(null)
        this.EVENT_SYMBOL = Object.create(null)
        this.STATE_SYMBOL = Object.create(null)
        this.root = document.createElement(type)
      //  this.created();
    }
    updated() {

    }
    mounted() {

    }
    setPropoty(name, value) {
        return this[_PROPERTY_SYMBOL][name] = value
    }
    getPropoty(name) {
        return this[_PROPERTY_SYMBOL][name]
    }
    setAttribute(name, value) { 
        return this.root.setAttribute(name,value)
    }
    getAttribute(name) {
        return this.root.getAttribute(name)
    }
 
    appendTo(element) {
        element.appendChild(this.root)
    }
    appendChild(child) {
        child.appendTo(this.root)
    }
}

