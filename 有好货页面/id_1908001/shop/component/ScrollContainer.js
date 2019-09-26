const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol("property")
export default class ScrollContainer {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this.init()
    }
    init () {
        this.container = document.createElement('div')
        this.container.addEventListener('touchmove', (e) => {
            e.cancelBubble = true
            e.stopImmediatePropagation()
        }, {
            passive:false
        })
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
        if (name === 'style') {
            this.container.setAttribute('style', value)
            return
        }
        return this[ATTRIBUTE_SYMBOL].name = value
    }
    getAttribute (name) {
        return this[ATTRIBUTE_SYMBOL].name
    }
}
