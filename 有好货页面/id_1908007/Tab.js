
import enableGesture from './enableGesture.js'
const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol('width') // 私有对象
const EVENT_SYMBOL = Symbol("event")
const STATE_SYMBOL = Symbol("state")
export default class Tab {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null) // 防止向上去找原型链
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this[PROPERTY_SYMBOL].children = []
        this[PROPERTY_SYMBOL].headers = []
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
        let title = child.getAttribute('tab-title') || ''
        this[PROPERTY_SYMBOL].headers.push(title)
        let header = document.createElement('header')
        header.className = 'tab-header-item'
        header.innerHTML = title
        this.headerContainer.appendChild(header)
        child.appendTo(this.contentContainer)
        for (let i = 0; i < this.contentContainer.children.length; i++) {
            this.contentContainer.children[i].className = 'tab-content-item'
        }
    }

    slide() {
        let startX = 0;
        let offset = 0
        let contentWidth = Math.round(this.contentContainer.getBoundingClientRect().width)
        console.log(contentWidth)
        enableGesture(this.contentContainer)
        let children = Array.prototype.slice.call(this.contentContainer.children);
        let position = 0;
        let offsetTimeStart = 0
        this.contentContainer.addEventListener("touchstart", event => {
            console.log('touchstart')
            let currentTime = Date.now()
            if (currentTime - offsetTimeStart < 1000) {
                offset = contentWidth - ease((currentTime - offsetTimeStart) / 1000) * contentWidth
            } else {
                offset = 0
            }

            // clearTimeout(nexPicTimer)
        })
        this.contentContainer.addEventListener("pan", event => {
            console.log('pan')
            if (event.isVertical) {
                return
            }
            let current = children[position]
            let nextPosition = (position + 1) % children.length
            let next = children[nextPosition]
            let lastPosition = (children.length + position - 1) % children.length
            let last = children[lastPosition]

            last.style.transition = "ease 0s";
            last.style.transform = `translate(${-contentWidth - contentWidth * lastPosition + event.dx + offset}px)`


            next.style.transition = "ease 0s";
            next.style.transform = `translate(${contentWidth - contentWidth * nextPosition + event.dx + offset}px)`

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${-contentWidth * position + event.dx + offset}px)`
        })

        this.contentContainer.addEventListener("panend", event => {
            console.log('panend')
            if (event.isVertical) {
                return
            }
            let isLeft;
            if (event.isFlick) {
                if (event.dx > 0) {
                    position = position - 1
                    isLeft = true
                }
                if (event.dx < 0) {
                    position = position + 1
                    isLeft = false
                }
            } else {
                if (event.dx > 250) {
                    position++
                    isLeft = true
                } else if (event.dx < -250) {
                    position--
                    isLeft = false
                } else if (event.dx > 0) {
                    isLeft = false
                } else {
                    isLeft = true
                }
            }
            position = (children.length + position) % children.length

            let current = children[position]
            let nextPosition = (position + 1) % children.length
            let next = children[nextPosition]
            let lastPosition = (children.length + position - 1) % children.length
            let last = children[lastPosition]

            if (isLeft) {
                last.style.transition = "";
            } else {
                last.style.transition = "ease 0s";
            }
            last.style.transform = `translate(${-contentWidth - contentWidth * lastPosition}px)`


            if (!isLeft) {
                next.style.transition = "";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${contentWidth - contentWidth * nextPosition}px)`

            current.style.transition = "";
            current.style.transform = `translate(${-contentWidth * position}px)`

        })
    }

    // 声明周期
    created() {
        this.root = document.createElement('div')
        this.headerContainer = document.createElement("div");
        this.headerContainer.className = 'tab-header'
        this.contentContainer = document.createElement("div");
        this.contentContainer.className = 'tab-content'
        this.root.appendChild(this.headerContainer)
        this.root.appendChild(this.contentContainer)

    }

    mounted() {
        this.slide()
    }

    unmounted() { }

    update() { }

    // destroyed() {}
}