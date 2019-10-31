
const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol('width') // 私有对象
const EVENT_SYMBOL = Symbol("event")
const STATE_SYMBOL = Symbol("state")
export class Carousel {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null) // 防止向上去找原型链
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        // 改为事件监听的方式传入 this.onWidthChange = null // 一种可定义的私有事件声明
        this.created();
    }
    // 一个基本的property的实现--属性
    get width() {
        // this._width 用另一个属性存，这是一种办法
        
        return this[PROPERTY_SYMBOL].width
    }

    set width(value) {
        console.log('Property change')
        return this[PROPERTY_SYMBOL].width = value // set也是需要return的
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value) {
        // 监听分流判断
        if (name == 'width') {
            // 单向同步
            this.width = value;
            console.log('Attribute change')
            // this.triggerEvent('widthchange')
        }
        return this[ATTRIBUTE_SYMBOL][name] = value
    }

    // methos---方法
    log() {
        console.log('width:', this.width) // 方法中调用属性尽可能调用类中公有的
    }

    addEventListener(type, listener) {
        if(!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set
        }
        this[EVENT_SYMBOL][type].add(listener)
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
           // throw new Error('没有这个事件类型') //完善的做法，报个错
           return // 简单粗暴
        }
        let events = this[EVENT_SYMBOL][type]
        // 使用Set新特性
        events.delete(listener)
        // for(let i = 0;  i < events.length; i++) {
        //     if (events[i] == listener) {
        //         // this[EVENT_SYMBOL][type].splice(i, 1)  // 简单粗暴
        //         // 小技巧
        //         // let tmp = events[i]
        //         // events[i] = events[event.length - 1]
        //         // events[event.length - 1] = tmp
        //         // events.pop()
                
        //     }
        // }
    }

    triggerEvent(type) {
        for(let event of this[EVENT_SYMBOL][type]) {
            event.call(this)
        }
    }

    appendTO(element) {
        console.log(element)
        console.log(this.root)
        element.appendChild(this.root)
        this.mounted()
    }

    // 声明周期
    created() {
        this.root = document.createElement('div')
        this.root.style.width = '300px'
        this.root.style.height = '300px'
        
        this[STATE_SYMBOL].h = 0
        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`
    }

    mounted() {
        this.root.addEventListener('click', () => {
            this[STATE_SYMBOL].h += 60
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`
        })
    }

    unmounted() {}

    update() {}

    // destroyed() {}
}