const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')
import create from './create'

export default class Carousel {
    constructor (config) {
        this.property = 1
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL].children = []
        this._container = container
        this.data = null
        this._container.classList.add('carousel')
        this._handler = null
        this.created()
    }

    appendTo (element) {
        element.appendChild(this.root)
        this.mounted()
    }
    created () {
        this.root = document.createElement('div')
    }
    render() {
        for (let d of this.data) {
            let img = document.createElement('img')
            img.src = d
            this._container.appendChild(img)
        }
        let tl = new Timeline()

        let children = Array.prototype.slice.call(this._container.children)

        let position = 0
        let offsetTimeStart = 0
        let nextPic = () => {
            let nextPosition = position + 1
            nextPosition = nextPosition % children.length

            let current = children[position]
            let next = children[nextPosition]

            next.style.transition = 'ease 0s'
            next.style.transform = `translate(${100 - nextPosition * 100}%)`

            offsetTimeStart = Date.now()

            tl.addAnimation(new DOMElementStyleNumberAnimation(
                current,
                'transform',
                0, -500 * position,
                500, -500 - 500 * position,
                (v) => `translateX(${v}px)`
            ))

            tl.addAnimation(new DOMElementStyleNumberAnimation(
                next,
                'transform',
                0, 500 - 500 * nextPosition,
                500, - 500 * nextPosition,
                (v) => `translateX(${v}px)`
            ))
            tl.restart()
            position = nextPosition
            // setTimeout(() => {
            //     current.style.transition = ''
            //     next.style.transition = ''
            //
            //     current.style.transform = `translate(${-100 - 100 * position}%)`
            //     next.style.transform = `translate(${-100 * nextPosition}%)`
            //
            //     position = nextPosition
            // }, 16)

            nextPicTimer = setTimeout(nextPic, 3000)
        }
        let nextPicTimer = setTimeout(nextPic, 3000)

        let x = 0
        let startTransform
        let offset = 0
        enableGesture(this._container)
        this._container.addEventListener('mousedown', event => {
            tl.pause()
            let currentTime = Date.now();

            if (currentTime - offsetTimeStart < 500) {
                offset = 500 - ease((currentTime - offsetTimeStart) / 500) * 500
                console.log(offset, '------offset---')
            } else {
                offset = 0
            }

            clearTimeout(nextPicTimer)
            // startTransform = - position * 500
        })
        this._container.addEventListener('pan', event => {
            if (event.isVertical) { return }

            let current = children[position]
            let nextPosition = (position + 1) % children.length
            let next = children[nextPosition]
            let lastPosition = (children.length + position - 1) % children.length
            let last = children[lastPosition]

            last.style.transition = 'ease 0s'
            last.style.transform = `translate(${-500 - lastPosition * 500  + event.dx + offset}px)`

            next.style.transition = 'ease 0s'
            next.style.transform = `translate(${500 - nextPosition * 500  + event.dx + offset}px)`

            current.style.transition = 'ease 0s'
            current.style.transform = `translate(${-position * 500  + event.dx + offset}px)`
        })
        this._container.addEventListener('panend', event => {
            if (event.isVertical) { return }
            let isLeft
            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
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
                    position --
                    isLeft = true
                } else if (event.dx < -250) {
                    position ++
                    isLeft = false
                } else if (event.dx > 0) {
                    isLeft = false
                } else {
                    isLeft = true
                }
                // position = (Math.round((position * 500 - event.dx) / 500))
            }
            position =  (children.length + position) % children.length
            let current = children[position]
            let nextPosition = (position + 1) % children.length
            let next = children[nextPosition]
            let lastPosition = (children.length + position - 1) % children.length
            let last = children[lastPosition]

            if (!isLeft) {
                last.style.transition = ''
            } else {
                last.style.transition = 'ease 0s'
            }

            last.style.transform = `translate(${-500 - lastPosition * 500}px)`

            if (isLeft) {
                next.style.transition = ''
            } else {
                next.style.transition = 'ease 0s'
            }

            next.style.transform = `translate(${500 - nextPosition * 500}px)`

            current.style.transition = ''
            current.style.transform = `translate(${ - position * 500}px)`

            // for (let child of children) {
            //     child.style.transition = ''
            //     child.style.transform = `translate(${-position * 500}px)`
            // }
        })
        this._container.addEventListener('mousedown', event => {
            event.preventDefault()
        })
        // let t = 0
        // let startTransform
        // let start = (event) => {
        //     startX = event.clientX
        //     startTransform = -position * 500
        //     document.addEventListener('mousemove', move)
        //     document.addEventListener('mouseup', end)
        // }
        // let move = event => {
        //     event.preventDefault()
        //     t = startTransform + event.clientX - startX
        //     for (let child of children) {
        //         child.style.transition = 'ease 0s'
        //         child.style.transform = `translate(${t}px)`
        //     }
        // }
        // let end = event => {
        //     document.removeEventListener('mousemove', move)
        //     document.removeEventListener('mouseup', end)
        //
        //     position = -Math.round(t / 500)
        //     position = Math.max(0, Math.min(position, children.length - 1))
        //
        //     for (let child of children) {
        //         child.style.transition = ''
        //         child.style.transform = `translate(${-position * 500}px)`
        //     }
        // }
        //
        // this._container.addEventListener('mousedown', start)
    }
    mounted () {

    }

    unmounted () {

    }

    update () {

    }
    appendChild (child) {
        this.children.push(child)
        child.appendChild(this.root)
    }
    get children () {
        return this[PROPERTY_SYMBOL].children
    }
    getAttribute (name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute (name, value) {
        if (name === 'width') {
            this.width = value
        }
        if (name === 'class') {
            this.root.setAttribute('class', value)
        }
        return this[ATTRIBUTE_SYMBOL][name] = value
    }
    addEventListener (type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set()
            this[EVENT_SYMBOL][type].add(listener)
        }
    }
    removeEventListener (type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return
        }
        this[EVENT_SYMBOL][type].delete(listener)
    }
    triggerEvent (type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this)
        }
    }
}

let data = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
]
let carousel = new Carousel(document.getElementById('container'))
carousel.data = data
carousel.render()
