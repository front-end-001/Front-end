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

    appendTo(element) {
        element.appendChild(this.root)
        this.mounted()
    }

    created() {
        this.root = document.createElement('span')
        this.root.innerText = this.text
    }
    mounted() {}
    unmounted() {}
    update() {}
}
