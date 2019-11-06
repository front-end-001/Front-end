const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol("property")
const EVENT_SYMBOL = Symbol("property")

export default class ScrollContainer {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this.init()
    }
    init () {
        this.container = document.createElement('div')
        this.placeHolder = document.createElement('div')
        this.placeHolder.innerText = '加载更多....'
        this.placeHolder.style.backgroundColor = 'green'
        let isTriggered = false
        this.container.addEventListener("scroll", e => {
            const r = this.container.getBoundingClientRect()
            const placeHolderElement = this.placeHolder.getBoundingClientRect()
            /*console.log('fcccc', this.container.scrollHeight, this.container.scrollTop, r.height)
            if (this.container.scrollHeight - this.container.scrollTop <= r.height) {
                this.triggerEvent('on-scrollEnd')
            }*/
            if (r.bottom < placeHolderElement.top && !isTriggered) {
                isTriggered = true
                this.triggerEvent('on-scrollEnd')
            }
        })
    }
    appendTo (body) {
        body.appendChild(this.container)
        this.container.appendChild(this.placeHolder)
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
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type){
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}
