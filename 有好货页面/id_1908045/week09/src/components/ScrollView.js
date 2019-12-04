import { enableGesture } from './../js/gesture.js'

const ATTRIBUTE_SYMBOL = Symbol('attribute')
const PROPERTY_SYMBOL = Symbol('property')
const EVENT_SYMBOL = Symbol('event')

export default class ScrollView {
    constructor() {
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)

        this[PROPERTY_SYMBOL].children = []
        this.create()
    }

    create() {
        this.root = document.createElement('div')
        this.root.style.overflow = 'hidden'
        this.root.style.position = 'relative'


        this.loadRefresh = document.createElement('div')
        this.loadRefresh.classList.add('load-refresh')
        this.loadRefresh.innerText = '下拉刷新'
        this.loadRefresh.style.height = '30px'
        this.loadRefresh.style.lineHeight = '30px'
        this.loadRefresh.style.transform = `translateY(-30px)`
        this.root.appendChild(this.loadRefresh)

        this.container = document.createElement('div')
        this.container.style.width = '100%'
        this.container.style.height = '100%'
        this.container.style.overflowY = 'auto'
        this.root.appendChild(this.container)

        enableGesture(this.container)

        let refreshing = false
        this.container.addEventListener("pan", event => {
            if (!event.isVertical || event.dy < 0 || refreshing) {
                return
            }
            if (this.container.scrollTop > 0) {
                return
            }
            const index = this[ATTRIBUTE_SYMBOL].index
            const width = this.container.getBoundingClientRect().width
            const dy = event.dy / 2
            if (dy > 30) {
                this.loadRefresh.innerText = '释放更新'
            }
            this.container.style.transition = 'ease 0s'
            this.loadRefresh.style.transform = `translateY(${dy - 30}px)`
            this.container.style.transform = `translateY(${dy}px)`
            if (!triggered) {
                this.triggerEvent('scrollToBottom', 'a')
                triggered = true
            }
        });

        const resetTransform = () => {
            refreshing = false
            this.loadRefresh.innerText = '下拉刷新'
            this.container.style.transition = 'ease 0s'
            this.loadRefresh.style.transform = `translateY(${-30}px)`
            this.container.style.transform = `translateY(${0}px)`
        }
        this.container.addEventListener("panend", event => {
            if (!event.isVertical || event.dy < 0 || refreshing) {
                return
            }
            if (this.container.scrollTop > 0) {
                return
            }
            const index = this[ATTRIBUTE_SYMBOL].index
            const width = this.container.getBoundingClientRect().width

            const dy = event.dy / 2
            this.container.style.transition = 'ease 0s'
            if (dy > 30) {
                this.loadRefresh.style.transform = `translateY(${0}px)`
                this.container.style.transform = `translateY(${30}px)`
                refreshing = true
                this.triggerEvent('refresh', resetTransform)
            } else {
                resetTransform()
            }
        });

        this.container.addEventListener("pancancel", event => {
            const index = this[ATTRIBUTE_SYMBOL].index
            const width = this.container.getBoundingClientRect().width
            resetTransform()
        });

        this.placeHolder = document.createElement('div')
        this.placeHolder.innerText = '加载更多'
        this.placeHolder.style.textAlign = 'center'
        this.placeHolder.style.backgroundColor = 'lightgreen'
        this.container.appendChild(this.placeHolder)

        let triggered = false

        const loadDone = e => {
            if (e === 'done') {
                triggered = false
            }
        }

        this.container.addEventListener('scroll', event => {
            let clientRect = this.container.getBoundingClientRect()
            let placeHolderRect = this.placeHolder.getBoundingClientRect()
            console.log(clientRect.bottom, placeHolderRect.top)
            if (clientRect.bottom > placeHolderRect.top) {
                if (!triggered) {
                    this.triggerEvent('scrollToBottom', loadDone)
                    triggered = true
                }
            }
            // console.log(this.root.scrollHeight,this.root.scrollTop,clientRect.height)
            // if(this.root.scrollHeight-this.root.scrollTop<=clientRect.height){
            //     // console.log('到底下了')
            //     this.triggerEvent('scrollToBottom','a')
            // }
        })
    }

    get children() {
        return this[PROPERTY_SYMBOL].children
    }

    setAttribute(name, value) {
        if (name === 'style') {
            this.container.style = value
            this.container.style.width = '100%'
            this.container.style.height = '100%'
            this.container.style.overflowY = 'auto'
        }
        if (name === 'placeHolderText') {
            this.placeHolder.innerText = value
        }
        return this[ATTRIBUTE_SYMBOL][name] = value
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }

    appendTo(element) {
        element.appendChild(this.root)
    }

    get style() {
        return this.root.style
    }


    appendChild(child) {
        // this.root.innerHtml=''
        this.children.push(child)
        child.appendTo(this.container);
        this.container.appendChild(this.placeHolder)
    }


    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set
        this[EVENT_SYMBOL][type].add(listener)
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            return
        this[EVENT_SYMBOL][type].delete(listener)
    }
    triggerEvent(type, ...args) {
        if (!this[EVENT_SYMBOL][type]) { return }
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this, ...args)
        }
    }
} 