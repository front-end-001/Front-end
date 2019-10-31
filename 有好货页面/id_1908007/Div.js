
const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol('width') // 私有对象
const EVENT_SYMBOL = Symbol("event")
const STATE_SYMBOL = Symbol("state")
export default class Div {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null) // 防止向上去找原型链
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this[PROPERTY_SYMBOL].children = []
        this.created();
    }
    // 一个基本的property的实现--属性
    get children() {

        return this[PROPERTY_SYMBOL].children
    }


    getAttribute(name) {
        if (name == 'className') {
            return this.root.getAttribute('class')
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value) {
        if (name == 'className') {
            this.root.setAttribute('class', value)
        }
        return this[ATTRIBUTE_SYMBOL][name] = value
    }

    // methos---方法

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set
        }
        this[EVENT_SYMBOL][type].add(listener)
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return // 简单粗暴
        }
        let events = this[EVENT_SYMBOL][type]
        // 使用Set新特性
        events.delete(listener)
    }

    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this)
        }
    }

    appendTo(element) {
        
        element.appendChild(this.root)
        this.mounted()
    }

    appendChild(child) {
        this.children.push(child)
        child.appendTo(this.root)
        
    }

    // 声明周期
    created() {
        this.root = document.createElement('div')
    }

    mounted() {

    }

    unmounted() { }

    update() { }

    // destroyed() {}
}