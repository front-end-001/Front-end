const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

export default class TabView {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null) // 不会找原型链
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this[PROPERTY_SYMBOL].children = []
        this[PROPERTY_SYMBOL].headers = []

        this.created()
    }

    appendTo(element) {
        element.appendChild(this.root)
        this.mounted()
    }

    created() {
        this.root = document.createElement('div')
        this.headerContainer = document.createElement('header')
        this.contentContainer = document.createElement('section')
        this.contentContainer.style.whiteSpace = 'nowrap'
        this.contentContainer.style.overflow = 'hidden'
        this.contentContainer.style.height = '100%'
        this.root.appendChild(this.headerContainer)
        this.root.appendChild(this.contentContainer)
    }

    mounted() {}

    unmounted() {}

    update() {}

    appendChild(child) {
        this.children.push(child)

        let title = child.getAttribute('tab-title') || ''
        this[PROPERTY_SYMBOL].headers.push(title)

        let header = document.createElement('div')
        header.innerText = title
        header.style.fontSize = '46px'
        this.headerContainer.appendChild(header)

        // 主要这里将子代加到this.root中
        child.appendTo(this.contentContainer)
        // 强制增加css
        for (let i = 0; i < this.contentContainer.children.length; i++) {
            this.contentContainer.children[i].style.width = '100%'
            this.contentContainer.children[i].style.height = '100%'
            this.contentContainer.children[i].style.display = 'inline-block'
        }
    }

    get children() {
        return this[PROPERTY_SYMBOL].children
    }

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
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set()
            this[EVENT_SYMBOL][type].add(listener)
        }
    }

    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            throw new Error('no such listener')
        }

        let events = this[EVENT_SYMBOL][type]
        events.delete(listener)
    }

    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this)
        }
    }
}
