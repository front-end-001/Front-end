const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

const log = console.log.bind(console)

class Carousel {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this._handle = null
        this.children = null
        this.position = 0
        this.offsetTimeStart = 0
        this.tl = new Timeline()

        this.created()
    }

    appendTo(element) {
        element.appendChild(this.root)
        this.mounted()
    }

    created() {
        this.root = document.createElement('div')
    }

    mounted() {
        this.root.style.width = this.width
        this.root.style.height = this.height
        this.root.style.overflow = 'hidden'
        this.root.style.whiteSpace = 'nowrap'

        for (let d of this.data) {
            let e = document.createElement('img')
            e.src = d
            e.style.width = '100%'
            e.style.height = '100%'
            e.style.display = 'inline-block'
            this.root.appendChild(e)
        }

        this.children = Array.prototype.slice.call(this.root.children)

        this.autoPlayFn()

        this.bindDefaultEvents()
    }

    unmounted() {}

    update() {}

    nextAuto() {
        let nextPosition = this.position + 1
        nextPosition = nextPosition % this.children.length
        let current = this.children[this.position]
        let nextImage = this.children[nextPosition]

        // 把Next 摆到下一张的位置
        nextImage.style.transition = 'ease 0s'
        nextImage.style.transform = `translateX(${100 - nextPosition * 100}%)`

        this.offsetTimeStart = Date.now()
        this.tl.clear()
        this.tl.addAnimation(
            new DOMElementStyleNumberAnimation({
                element: current,
                property: 'transform',
                startTime: 0,
                startValue: -500 * this.position,
                endTime: 1000,
                endValue: -500 - 500 * this.position,
                callback: v => `translateX(${v}px)`,
            }),
        )
        this.tl.addAnimation(
            new DOMElementStyleNumberAnimation({
                element: nextImage,
                property: 'transform',
                startTime: 0,
                startValue: 500 - 500 * nextPosition,
                endTime: 1000,
                endValue: -500 * nextPosition,
                callback: v => `translateX(${v}px)`,
            }),
        )
        this.tl.restart()
        this.position = nextPosition

        this._handle = setTimeout(() => this.nextAuto(), 3000)
    }

    autoPlayFn() {
        if (this.autoPlay) {
            this._handle = setTimeout(() => this.nextAuto(), 3000)
        }
    }

    bindDefaultEvents() {
        enableGesture(this.root)
        this.root.addEventListener('mouseover', event => {
            clearTimeout(this._handle)
            this._handle = null
        })

        this.root.addEventListener('mouseout', event => {
            if (this._handle === null) {
                this.autoPlayFn()
            }
        })

        this.root.addEventListener('mousedown', event => {
            event.preventDefault()
        })

        let startTransform

        this.root.addEventListener('panstart', event => {
            clearTimeout(this._handle)
            this._handle = null
        })

        this.root.addEventListener('pan', event => {
            startTransform = -500 * this.position

            for (let child of this.children) {
                child.style.transition = 'ease 0s'
                child.style.transform = `translate(${startTransform + event.dx}px)`
            }
        })

        // 结束滑动事件
        this.root.addEventListener('panend', event => {
            if (event.isVertical) return

            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                if (event.dx > 0) {
                    this.position = this.position - 1
                }
                if (event.dx < 0) {
                    this.position = this.position + 1
                }
            } else {
                this.position = -Math.round((startTransform + event.dx) / 500)
            }

            // 给position设置边界
            this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

            for (let child of this.children) {
                child.style.transition = ''
                child.style.transform = `translate(${-500 * this.position}px)`
            }

            this.autoPlayFn()
        })
    }

    get data() {
        return this[PROPERTY_SYMBOL].data
    }

    set data(value) {
        return (this[PROPERTY_SYMBOL].data = value)
    }

    get width() {
        return this[PROPERTY_SYMBOL].width
    }

    set width(value) {
        return (this[PROPERTY_SYMBOL].width = value)
    }

    get height() {
        return this[PROPERTY_SYMBOL].height
    }

    set height(value) {
        return (this[PROPERTY_SYMBOL].height = value)
    }

    get autoPlay() {
        return this[PROPERTY_SYMBOL].autoPlay
    }

    set autoPlay(value) {
        return (this[PROPERTY_SYMBOL].autoPlay = value)
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }

    setAttribute(name, value) {
        if (name == 'width') {
            this.width = value
            if (this[EVENT_SYMBOL]['widthchange']) {
                this.triggerEvent('widthchange')
            }
        }
        if (name == 'data') {
            this.data = value
        }

        if (name == 'height') {
            this.height = value
        }

        return (this[ATTRIBUTE_SYMBOL][name] = value)
    }

    addEventListener(type, listener) {
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
        events.delete(listener)
    }

    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this)
        }
    }
}
