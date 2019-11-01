const ATTRIBUTE_SYMBOL = Symbol('attribute')
const PROPERTY_SYMBOL = Symbol('property')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

export default class Component {
    constructor(config = {}) {
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this.created()
    }

    get children() {
        return this[PROPERTY_SYMBOL].children
    }

    created() {
        this.root = document.createElement('div')
    }

    getAttribute(name) {
        if (name === 'style') this.root.getAttribute('style')
        return this[ATTRIBUTE_SYMBOL][name]
    }

    setAttribute(name, value) {
        if (name === 'style') this.root.setAttribute('style', value)
        return this[PROPERTY_SYMBOL][name] = this[ATTRIBUTE_SYMBOL][name] = value
    }

    appendTo(element) {
        element.appendChild(this.root)
        this.mounted()
    }

    appendChild(child) {
        this.children.push(child)
        child.appendTo(this.root)
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set()
        this[EVENT_SYMBOL][type].add(listener)
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) return
        this[EVENT_SYMBOL][type].delete(listener)
    }
    triggerEvent(type) {
        if (!this[EVENT_SYMBOL][type]) return 
        for (let event of this[EVENT_SYMBOL][type]) event.call(this)
    }
}