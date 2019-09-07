// property: width, height, images, interval
// event: click, swipe, change
// state:
// lifeCycle: mounted, change
// method: pause, restart
const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event")
class Carousel {
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
            imageElement.style.transition = 'ease 0.5s'
            this.container.appendChild(imageElement)
        }
        this.render()
        element.appendChild(this.container)
        this.mounted()
    }
    render () {
        const children = Array.prototype.slice.call(this.container.children)
        let position = 0
        const nextFrame = function () {
            // 等价于 if(position+1 > children.length - 1) position = 0
            const nextPosition = (position + 1) % children.length
            const current = children[position],
                next = children[nextPosition]
            // ---实现第二张替换第一张的动画效果--begin
            next.style.transition = "ease 0s"
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`
            console.log(nextPosition, 100 - 100 * nextPosition)
            setTimeout(() => {
                current.style.transition = ""
                current.style.transform = `translate(${-100 - 100 * position}%)`
                console.log(position, -100 - 100 * position)
                next.style.transition = ""
                next.style.transform = `translate(${-100 * nextPosition}%)`
                console.log(-100 * nextPosition)
                position = nextPosition
            }, 16)
            // ---实现第二张替换第一张的动画效果--end
            setTimeout(nextFrame, 3000)
        }
        setTimeout(nextFrame, 3000)
        let x = 0
        initGesture(this.container)
        this.container.addEventListener('pan', event => {
            if(event.isVertical)
                return
            for(let child of children) {
                child.style.transition = 'ease 0s'
                child.style.transform = `translateX(${event.dx + x}px`
            }
        })
        this.container.addEventListener('panEnd', event => {
            if(event.isVertical)
                return;
            if(event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)){
                if(event.dx > 0) {
                    position = position - 1
                }
                if(event.dx < 0) {
                    position = position + 1
                }
            } else {
                position = -(Math.round((x + event.dx) / 500))
            }

            position = Math.max(0, Math.min(position, children.length - 1))

            for(let child of children) {
                child.style.transition = ''
                child.style.transform = `translate(${-position * 500}px)`
            }
            x = -position * 500
        })
        this.container.addEventListener('mousedown', event => event.preventDefault())
    }
    mounted () {
        console.log('mounted...')
    }
    change () {

    }
    pause () {

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
    setAttribute (name, value) {
        return this[ATTRIBUTE_SYMBOL][name] = value
    }
    getAttribute (name) {
        return this[ATTRIBUTE_SYMBOL][name]
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
        for(const event of this[EVENT_SYMBOL][type]) {
            event.call(this)
        }
    }
}
