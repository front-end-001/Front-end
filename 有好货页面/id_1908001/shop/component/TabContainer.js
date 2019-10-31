const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol("property")
const STATE_SYMBOL = Symbol("state")
import initGesture from '../tool/gesture'
export default class TabContainer {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL].children = []
        this[PROPERTY_SYMBOL].headers = []
        this.init()
    }
    init () {
        this.container = document.createElement('div')
        this.container.addEventListener('touchmove', (e) => {
            e.cancelBubble = true
            e.stopImmediatePropagation()
        }, {
            passive:false
        })
        this.container.style.height = '100%'

        this.headerContainer = document.createElement('div')
        this.headerContainer.style.height = '93px'
        this.container.appendChild(this.headerContainer)

        this.contentContainer = document.createElement('div')
        this.contentContainer.style.overflow = 'hidden'
        this.contentContainer.style.whiteSpace = 'nowrap'
        this.contentContainer.style.flex = '1'
        this.container.appendChild(this.contentContainer)
        initGesture(this.contentContainer)
        this[STATE_SYMBOL].position = 0
        this.contentContainer.addEventListener('pan', event => {
            if (event.isVertical) {
                return
            }
            event.preventDefault()
            const width = this.contentContainer.getBoundingClientRect().width
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transition = "ease 0.5s"
                this.contentContainer.children[i].style.transform = `translateX(${event.dx - width * this[STATE_SYMBOL].position}px)`
            }
        })
        this.contentContainer.addEventListener('panEnd', event => {
            if (event.isVertical) {
                return
            }
            event.preventDefault()
            const width = this.contentContainer.getBoundingClientRect().width
            if(event.isFlick) {
                if(event.vx > 0) {
                    this[STATE_SYMBOL].position --
                }
                if(event.vx < 0) {
                    this[STATE_SYMBOL].position ++
                }
            } else {
                if(event.dx > width/2) {
                    this[STATE_SYMBOL].position --
                } else if(event.dx < -width/2) {
                    this[STATE_SYMBOL].position ++
                } else if(event.dx > 0) {
                } else {
                }
            }
            let position = this[STATE_SYMBOL].position
            if (position < 0) {
                position = 0
            }
            const length = this.contentContainer.children.length
            if (position >= length) {
                position = length - 1
            }
            for(let i = 0; i < length; i ++) {
                this.contentContainer.children[i].style.transition = "transform ease 0.5s"
                this.contentContainer.children[i].style.transform = `translateX(${- width * position}px)`
            }
        })
    }
    appendTo (body) {
        body.appendChild(this.container)
    }
    appendChild (child) {
        const title = child.getAttribute('tabTitle')
        if (!title) {
            return
        }
        const header = document.createElement('div')
        header.innerText = title
        // header.id = this.children.length
        const n = this.children.length
        header.style.display = 'inline-block'
        header.style.height = '93px'
        header.style.fontFamily = 'PingFang SC'
        header.style.fontSize = '20px'
        header.style.margin = '20px 35px 0 35px'
        header.addEventListener('click', e => {
            /*child.setAttribute("style", ``)
            const current = this.children[this[STATE_SYMBOL].position]
            current.setAttribute("style", ``)
            this[STATE_SYMBOL].position = header.id
            */
            this[STATE_SYMBOL].position = n
            console.log('++++n----', n, this.contentContainer.children.length)
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transition = "ease 0.5s"
                this.contentContainer.children[i].style.transform = `translateX(${-n * 100}%)`
            }
        })
        this.headerContainer.appendChild(header)
        this.headers.push(header)
        this.children.push(child)
        child.appendTo(this.contentContainer)
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.display = "inline-block"
            this.contentContainer.children[i].style.width = "100%"
            this.contentContainer.children[i].style.verticalAlign = "true"
            this.contentContainer.children[i].style.height = "100%"
        }
    }
    get children () {
        return this[PROPERTY_SYMBOL].children
    }
    get headers () {
        return this[PROPERTY_SYMBOL].headers
    }
    setAttribute (name, value) {
        if (name === 'className') {
            this.container.classList.add(value)
        }
        if (name === 'style') {
            this.container.setAttribute('style', value)
        }
        this.container.style.display = "flex"
        this.container.style.flexDirection = "column"
        return this[ATTRIBUTE_SYMBOL].name = value
    }
    getAttribute (name) {
        return this[ATTRIBUTE_SYMBOL].name
    }
}
