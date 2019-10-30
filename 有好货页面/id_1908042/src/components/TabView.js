import { enableGesture  } from '../utils/gesture'

const ATTRIBUTE_SYMBOL = Symbol('arrtibute')
const PROPERTY_SYMBOL = Symbol('property')
const STATE_SYMBOL = Symbol('state')

export default class TavView {
    constructor() {
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        
        this[PROPERTY_SYMBOL].children = []
        this[PROPERTY_SYMBOL].headers = []

        this.create()
    }

    get children() {
        return this[PROPERTY_SYMBOL].children
    }

    set headers(value) {
        return this[PROPERTY_SYMBOL].headers = value
    }

    get headers() {
        return this[PROPERTY_SYMBOL].headers
    }

    create() {
        this.root = document.createElement('div')

        this.contentContainer = document.createElement('div')
        this.contentContainer.classList.add('tab-content')

        this.listContainer = document.createElement('div')
        this.listContainer.classList.add('tab-container-list')

        this.contentContainer.appendChild(this.listContainer)

        this.headerContainer = document.createElement('div')
        this.headerContainer.classList.add('tab-header')

        this.root.appendChild(this.headerContainer)
        this.root.appendChild(this.contentContainer)

        enableGesture(this.listContainer)

        this[STATE_SYMBOL].position = 0

        this.root.addEventListener('touchmove', e => {
            e.cancelBubble = true
            e.stopImmediatePropagation()
        }, { passive: false })

        this.listContainer.addEventListener('pan', e => {
            if (e.isVertical) return 
            
            let width = this.contentContainer.getBoundingClientRect().width
            let dx = e.dx
            
            if (this[STATE_SYMBOL].position === 0 && e.dx > 0) {
                dx /= 2
            }

            if (this[STATE_SYMBOL].position === this.listContainer.children.length - 1 && e.dx > 0) {
                dx /= 2
            }

            for (let i = 0; i < this.listContainer.children.length; i++) {
                this.listContainer.children[i].style.transition = 'ease 0s'
                this.listContainer.children[i].style.transform = `translateX(${dx - width * this[STATE_SYMBOL].position}px)`
            }
        })

        this.listContainer.addEventListener('panedn', e => {
            if (e.isVertical) return 

            e.preventDefault()
            let position = this[STATE_SYMBOL].position
            let width = this.listContainer.getBoundingClientRect().width / 3
            let isLeft

            if (e.isFlick) {
                if (e.dx > 0) {
                    position--
                    isLeft = true
                } else {
                    position++
                    isLeft = false
                }
            } else {
                if (e.dx > width / 2) {
                    position--
                    isLeft = true
                } else if (e.dx < -(width / 2)) {
                    position++
                    isLeft = false
                } else if (e.dx > 0) {
                    isLeft = false
                } else {
                    isLeft = true
                }
            }

            if (position < 0) position = 0
            if (position >= this.listContainer.children.length) position = this.listContainer.children.length - 1
            
            for (let i = 0; i < this.listContainer.children.length; i++) {
                this.listContainer.children[i].style.transition = 'ease 0s'
                this.listContainer.children[i].style.transform = `translateX(${-width * position}px)`
            }

            this[STATE_SYMBOL].position = position

        })
    }

    setAttribute(name, value) {
        if (name === 'style') {
            this.root.style = value
            this.root.style.display = 'flex'
            this.root.style.flexDirection = 'column'
        }
        return this[ATTRIBUTE_SYMBOL][name] = value
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }

    appendTo(element) {
        element.appendChild(this.root)
    }

    appendChild(child) {
        const len = this.children.length

        this.children.push(child)
        child.setAttribute('index', len)
        child.appendTo(this.listContainer)
        this.listContainer.style.width = `${this.children.length}00%`

        let title = child.getAttribute('tab-title') || ''
        this.headers.push(title)

        let header = document.createElement('span')
        header.innerText = title
        this.headerContainer.appendChild(header)
        this.headerContainer.children[0].classList.add('tab-active')

        header.addEventListener('click', e => {
            this[STATE_SYMBOL].position = len

            for (let i = 0; i < this.listContainer.children.length; i++) {
                this.listContainer.children[i].style.width = '100%'
                this.listContainer.children[i].style.height = '100%'
                this.listContainer.children[i].style.transition = 'ease 0s'
                this.listContainer.children[i].style.transform = `translateX(${-len * 100}%)`
            }

            for (let i = 0; i < this.headerContainer.children; i++) {
                this.headerContainer.children[i].classList.remove('tab-active')
            }

            header.classList.add('tab-active')
        })

        for (let i = 0; i < this.listContainer.children.length; i++) {
            this.listContainer.children[i].style.width = `${100 / this.children.length}%`
            this.listContainer.children[i].style.height = '100%'
        }
    }
    
}