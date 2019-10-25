const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

class Carousel {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null) // 不会找原型链
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this.created()
    }

    appendTo(element) {
        element.appendChild(this.root)
        this.mounted()
    }

    created() {
        this.root = document.createElement('div')
        this.root.style.width = '300px'
        this.root.style.height = '300px'
        this[STATE_SYMBOL].h = 0
        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`
    }

    mounted() {
        this.root.addEventListener('click', () => {
            this[STATE_SYMBOL].h += 30
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`
        })
    }

    unmounted() {}

    update() {}

    log() {
        console.log('width:', this.width)
    }

    // 修改property 我想得到通知
    // 想给用户用的property， 用get/set
    get width() {
        return this[PROPERTY_SYMBOL].width
    }

    set width(value) {
        return (this[PROPERTY_SYMBOL].width = value)
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }

    setAttribute(name, value) {
        if (name == 'width') {
            this.width = value
            this.triggerEvent('widthChange')
        }
        return (this[ATTRIBUTE_SYMBOL][name] = value)
    }

    addEventListener(type, listener) {
        // if (!this[EVENT_SYMBOL][type]) {
        //     this[EVENT_SYMBOL][type] = []
        //     this[EVENT_SYMBOL][type].push(listener)
        // }
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
        // for (let i = 0; i < events.length; i++) {
        //     if (events[i] == listener) {
        //         // this[EVENT_SYMBOL][type].splice(i, 1)
        //         // // 交换i和最后一个，然后pop
        //         let tmp = events[i]
        //         events[i] = events[events.length - 1]
        //         events[events.length - 1] = tmp
        //         events.pop()
        //     }
        // }

        // 用set, 因为set会记住那个变量
        events.delete(listener)
    }

    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this)
        }
    }
}
