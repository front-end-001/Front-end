// property: width, height, images, interval
// event: click, swipe, change
// state:
// lifeCycle: mounted, change
// method: pause, restart
const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
import initGesture from '../carousel/gesture/gesture.js'
export default class Carousel {
    constructor () {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
    }
    init (element) {
        this.container = document.createElement('div')
        this.container.style.width = this.width
        this.container.style.height = this.height
        this.container.style.whiteSpace = 'nowrap'
        this.container.style.overflow = 'hidden'
        for (let i = 0; i < this.images.length; i++) {
            const imageElement = document.createElement('img')
            imageElement.src = this.images[i]
            imageElement.style.width = '100%'
            imageElement.style.height = '100%'
            imageElement.style.display = 'inline-block'
            imageElement.addEventListener('click', event => {
                window.open(this.images[i])
                this.triggerEvent('click')
            })
            this.container.appendChild(imageElement)
        }
        element.appendChild(this.container)
        this.mounted()
    }
    mounted () {
        console.log('mounted...')
        const children = Array.prototype.slice.call(this.container.children)
        const timeLine = new TimeLine()
        let position = 0
        let offsetTimeStart = 0
        const nextFrame = function () {
            // 等价于 if(position+1 > children.length - 1) position = 0
            const nextPosition = (position + 1) % children.length
            const current = children[position],
                next = children[nextPosition]
            // ---实现第二张替换第一张的动画效果--begin
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`
                console.log(nextPosition, 100 - 100 * nextPosition)
            offsetTimeStart = Date.now()
            timeLine.addAnimation(new DOMElementStyleNumberAnimation(
                current,
                'transform',
                0, - 500 * position,
                1000, - 500 - 500 * position,
                (v) => `translateX(${v}px)`
            ))
            timeLine.addAnimation(new DOMElementStyleNumberAnimation(
                next,
                'transform',
                0, 500 - 500 * nextPosition,
                1000, - 500 * nextPosition,
                (v) => `translateX(${v}px)`
            ))
            timeLine.restart()
            position = nextPosition
            // ---实现第二张替换第一张的动画效果--end
            nextPicTimer = setTimeout(nextFrame, 3000)
        }
        let nextPicTimer = setTimeout(nextFrame, 3000)
        initGesture(this.container)
        let offset = 0
        this.container.addEventListener('mousedown', event => {
            event.preventDefault()
            timeLine.pause()
            const currentTime = Date.now()
            offset = (currentTime - offsetTimeStart) < 1000 ? 500 - ease((currentTime - offsetTimeStart) / 1000) * 500 : 0
            clearTimeout(nextPicTimer)
        })
        this.container.addEventListener('pan', event => {
            event.preventDefault()
            const current = children[position]
            const nextPosition = (position + 1) % children.length
            const next = children[nextPosition]
            const lastPosition = (children.length + position - 1) % children.length
            const last = children[lastPosition]
            last.style.transition = 'ease 0s'
            last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx + offset}px)`
            next.style.transition = 'ease 0s'
            next.style.transform = `translate(${500 - 500 * nextPosition  + event.dx + offset}px)`
            current.style.transition = 'ease 0s'
            current.style.transform = `translate(${- 500 * position + event.dx + offset}px)`
        })
        this.container.addEventListener('panEnd', event => {
            event.origin.preventDefault()
            let isLeft
            if(event.isFlick) {
                if(event.vx > 0) {
                    position --
                    isLeft = true
                }
                if(event.vx < 0) {
                    position ++
                    isLeft = false
                }
            } else {
                if(event.dx > 250) {
                    position --
                    isLeft = true
                } else if(event.dx < -250) {
                    position ++
                    isLeft = false
                } else if(event.dx > 0) {
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
            if(!isLeft){
                last.style.transition = ''
            } else {
                last.style.transition = 'ease 0s'
            }
            last.style.transform = `translate(${-500 - 500 * lastPosition}px)`
            if(isLeft){
                next.style.transition = ''
            } else {
                next.style.transition = 'ease 0s'
            }
            next.style.transform = `translate(${500 - 500 * nextPosition}px)`
            current.style.transition = ''
            current.style.transform = `translate(${- 500 * position}px)`
        })
    }
    restart () {
    }
    set width (value) {
        return this[PROPERTY_SYMBOL].width = value
    }
    get width () {
        return this[PROPERTY_SYMBOL].width
    }
    set height (value) {
        return this[PROPERTY_SYMBOL].height = value
    }
    get height () {
        return this[PROPERTY_SYMBOL].height
    }
    set images (value) {
        return this[PROPERTY_SYMBOL].images = value
    }
    get images () {
        return this[PROPERTY_SYMBOL].images
    }
    set interval (value) {
        return this[PROPERTY_SYMBOL].interval = value
    }
    get interval () {
        return this[PROPERTY_SYMBOL].interval
    }
    addEventListener (type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set()
        }
        this[EVENT_SYMBOL][type].add(listener)
    }
    removeEventListener (type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return null
        }
        this[EVENT_SYMBOL][type].delete(listener)
    }
    triggerEvent (type){
        if (!this[EVENT_SYMBOL][type]) {
            return null
        }
        for(const event of this[EVENT_SYMBOL][type]) {
            event.call(this)
        }
    }
    change () {

    }
    pause () {

    }
    setAttribute (name, value) {
    }
    getAttribute (name) {
    }
}
