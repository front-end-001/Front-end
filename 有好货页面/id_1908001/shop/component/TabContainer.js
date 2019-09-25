const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol("property")
const STATE_SYMBOL = Symbol("state")
import initGesture from './../gesture'
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
        this.container.style.height = '100%'

        this.headerContainer = document.createElement('div')
        this.headerContainer.style.height = '93px'
        this.container.appendChild(this.headerContainer)

        this.contentContainer = document.createElement('div')
        this.contentContainer.style.overflow = 'hidden'
        this.contentContainer.style.whiteSpace = 'nowrap'
        this.contentContainer.style.flex = '1'
        this.container.appendChild(this.contentContainer)
        initGesture(this.container)
        this[STATE_SYMBOL].position = 0
        this.container.addEventListener('pan', event => {
            event.preventDefault()
            const children = this.children
            const position = this[STATE_SYMBOL].position
            const current = children[position]
            const nextPosition = (position + 1) % children.length
            const next = children[nextPosition]
            const lastPosition = (children.length + position - 1) % children.length
            const last = children[lastPosition]
            console.log(current, last)
            last.style.transition = 'ease 0s'
            last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx}px)`
            next.style.transition = 'ease 0s'
            next.style.transform = `translate(${500 - 500 * nextPosition  + event.dx}px)`
            current.style.transition = 'ease 0s'
            current.style.transform = `translate(${- 500 * position + event.dx}px)`
        })
        this.container.addEventListener('panEnd', event => {
            event.origin.preventDefault()
            let position = this[STATE_SYMBOL].position
            const children = this.children
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
            this[STATE_SYMBOL].position = position
        })
    }
    appendTo (body) {
        body.appendChild(this.container)
    }
    appendChild (child) {
        const title = child.getAttribute('tabTitle') || ""
        this.children.push(child)
        child.appendTo(this.contentContainer)
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.display = "inline-block"
            this.contentContainer.children[i].style.width = "100%"
            this.contentContainer.children[i].style.height = "100%"
        }
        if (title) {
            const header = document.createElement('div')
            header.innerText = title
            header.style.display = 'inline-block'
            header.style.height = '93px'
            header.style.fontFamily = 'PingFang SC'
            header.style.fontSize = '20px'
            header.style.margin = '20px 35px 0 35px'
            header.addEventListener('click', e => {
                child.setAttribute("style", "transition:ease 0s;transform:translate(0px)")
                const current = this.children[this[STATE_SYMBOL].position]
                current.setAttribute("style", "transition:;transform:translate(0px)")
            })
            this.headerContainer.appendChild(header)
            this.headers.push(header)
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
