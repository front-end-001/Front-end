const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

export default class Text {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this.text = config || ''

        this[PROPERTY_SYMBOL].children = []

        this.created()
    }

    get children() {
        return this[PROPERTY_SYMBOL].children
    }

    appendTo(element) {
        element.appendChild(this.root)
        this.mounted()
    }

    appendChild(child) {
        this.children.push(child)
        child.appendTo(this.root)
    }

    created() {
        this.root = document.createElement('span')
        this.root.innerText = this.text
    }
    mounted() {}
    unmounted() {}
    update() {}

    getAttribute(name) {
        if (name == 'style') {
            return this.root.getAttribute('style')
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value) {
        if (name == 'style') {
            this.root.setAttribute('style', value)
        }
        return (this[ATTRIBUTE_SYMBOL][name] = value)
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
