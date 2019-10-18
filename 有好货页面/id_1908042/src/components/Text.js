const ATTRIBUTE_SYMBOL = Symbol('attribute')
const PROPERTY_SYMBOL = Symbol('property')

export default class Text {
    constructor(config) {
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL] = Object.create(null)

        this[PROPERTY_SYMBOL].children = []

        this.text = config || ''
        this.create()
    }

    create() {
        this.root = document.createElement('span')
        this.root.innerText = this.text
    }

    get children() {
        return this[PROPERTY_SYMBOL].children
    }

    setAttribute(name, value) {
        if (name === 'style') {
            this.root.style = value
        }
        this[ATTRIBUTE_SYMBOL][name] = value
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }

    appendTo(element) {
        element.appendChild(this.root)
    }

    appendChild(child) {
        this.children.push(child)
        this.appendTo(child)
    }
} 