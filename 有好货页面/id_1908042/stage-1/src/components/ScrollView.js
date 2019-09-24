const ATTRIBUTE_SYMBOL = Symbol('attribute')
const PROPERTY_SYMBOL = Symbol('property')

export class ScrollView {
    constructor() {
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL] = Object.create(null)

        this[PROPERTY_SYMBOL].children = []
        this.create()
    }

    create() {
        this.root = document.createElement('div')
    }

    get children() {
        return this[PROPERTY_SYMBOL].children
    }

    setAttribute(name, value) {
        if (name === 'style') {
            this.root.style = value
        }
        return this[ATTRIBUTE_SYMBOL][name] = value
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