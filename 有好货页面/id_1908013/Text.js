const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

export default class Text {
    constructor (config) {
        this.property = 1
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this[PROPERTY_SYMBOL].children = []
        this.text = config || ''
        this.created()
    }

    appendTo (element) {
        element.appendChild(this.root)
        this.mounted()
    }
    created () {
        this.root = document.createElement('span')
        this.root.innerText = this.text
    }
    mounted () {

    }

    unmounted () {

    }

    update () {

    }
    appendChild (child) {
        let dpr = window.devicePixelRatio
        if (child.style.fontSize) {
            let fontSize = parseInt(child.style.fontSize)
            this.root.style = `font-size:${fontSize * dpr}px`
        }
        this.children.push(child)
        child.appendChild(this.root)
    }
    get children () {
        return this[PROPERTY_SYMBOL].children
    }
    getAttribute (name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute (name, value) {
        if (name === 'style') {
            this.root.setAttribute('style', value)
        }
        return this[ATTRIBUTE_SYMBOL][name] = value
    }
    addEventListener (type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set()
            this[EVENT_SYMBOL][type].add(listener)
        }
    }
    removeEventListener (type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return
        }
        this[EVENT_SYMBOL][type].delete(listener)
    }
    triggerEvent (type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this)
        }
    }
}
