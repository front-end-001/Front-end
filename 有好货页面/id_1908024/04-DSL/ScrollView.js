const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

export default class ScrollView {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this[PROPERTY_SYMBOL].children = []

        this.created()
    }

    get children() {
        return this[PROPERTY_SYMBOL].children
    }

    get style() {
        return this.root.style
    }

    appendTo(element) {
        element.appendChild(this.root)
        this.mounted()
    }

    appendChild(child) {
        this.children.push(child)
        child.appendTo(this.root)
        this.root.appendChild(this.placeHolder)
    }

    created() {
        this.root = document.createElement('div')
        this.placeHolder = document.createElement('div')

        this.placeHolder.style.backgroundColor = 'lightgreen'
        this.root.appendChild(this.placeHolder)

        let triggered = false

        this.root.addEventListener('scroll', event => {
            let clientRect = this.root.getBoundingClientRect()
            let placeHolderRect = this.placeHolder.getBoundingClientRect()
            //console.log(clientRect.bottom, )
            if (clientRect.bottom > placeHolderRect.top) {
                this.triggerEvent('scrolToBottom')
                // if (triggered) {
                //     triggered = true
                // }
            } else {
                this.placeHolder.innerText = 'loadmore'
            }
        })
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
        if (name == 'placeHolderText') {
            this.placeHolder.innerText = value
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
