const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

import enableGesture from './gesture'
import { Timeline, DOMElementStyleNumberAnimation } from './animation'

export default class TabView {
    constructor (config) {
        this.property = 1
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL].children = []
        this[PROPERTY_SYMBOL].headers = []
        this.created()
    }

    appendTo (element) {
        element.appendChild(this.root)
        this.mounted()
    }
    created () {
        this.root = document.createElement('div')
        this.headerContainer = document.createElement('div')
        this.contentContainer = document.createElement('div')

        this.headerContainer.style = 'height: 13.889vw;display:flex;align-items:center;background-image:linear-gradient(to right, #6b25fd , #9232fd);'

        this.contentContainer.style = 'flex:1;overflow:hidden;white-space:nowrap'
        this.root.appendChild(this.headerContainer)
        this.root.appendChild(this.contentContainer)

        enableGesture(this.contentContainer)
        this[STATE_SYMBOL].position = 0

        this.root.addEventListener("touchmove",function(e) {
            e.cancelBubble = true;
            e.stopImmediatePropagation()
        }, { passive:false });
        this.contentContainer.addEventListener('pan', event => {
            event.preventDefault()
            if (event.isVertical) {
                return
            }
            let width = this.contentContainer.getBoundingClientRect().width

            let dx = event.dx

            if (this[STATE_SYMBOL].position === 0 && event.dx > 0) {
                dx = dx /2
            }
            if (this[STATE_SYMBOL].position === this.contentContainer.children.length - 1 && event.dx < 0) {
                dx = dx /2
            }
            for (let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transition = 'transform ease 0s'
                this.contentContainer.children[i].style.transform = `translate(${ dx - width * this[STATE_SYMBOL].position }px)`
            }

        })
        this.contentContainer.addEventListener('panend', event => {
            if (event.isVertical) { return }
            let width = this.contentContainer.getBoundingClientRect().width
            let isLeft
            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                if (event.dx > 0) {
                    this[STATE_SYMBOL].position = this[STATE_SYMBOL].position - 1
                    isLeft = true
                }
                if (event.dx < 0) {
                    this[STATE_SYMBOL].position = this[STATE_SYMBOL].position + 1
                    isLeft = false
                }
            } else {
                if (event.dx > width / 2) {
                    this[STATE_SYMBOL].position --
                    isLeft = true
                } else if (event.dx < -width / 2) {
                    this[STATE_SYMBOL].position ++
                    isLeft = false
                } else if (event.dx > 0) {
                    isLeft = false
                } else {
                    isLeft = true
                }
                // position = (Math.round((position * 500 - event.dx) / 500))
            }
            // position =  (children.length + position) % children.length
            if (this[STATE_SYMBOL].position < 0) {
                this[STATE_SYMBOL].position = 0
            }
            if (this[STATE_SYMBOL].position >= this.contentContainer.children.length) {
                this[STATE_SYMBOL].position = this.contentContainer.children.length -1
            }

            for (let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transition = 'transform ease 0.5s'
                this.contentContainer.children[i].style.transform = `translate(${ - width * this[STATE_SYMBOL].position }px)`
            }
        })
    }
    mounted () {


    }

    unmounted () {

    }

    update () {

    }
    appendChild (child) {
        let n = this.children.length

        this.children.push(child)

        let title = child.getAttribute('tab-title') || ''
        this[PROPERTY_SYMBOL].headers.push(title)

        let header = document.createElement('div')
        header.style = `display:flex;flex-direction:column;margin: 0 3.148vw;align-items:center`
        // let bottomLine = document.createElement('div')
        // bottomLine.style = `display:inline-block;height:2px;background-color:white;width:20px;`

        let titleContainer = document.createElement('div')
        let dpr = window.devicePixelRatio
        titleContainer.style = `color:white;font-size: ${dpr * 16}px;`
        titleContainer.innerText = title
        header.appendChild(titleContainer)
        //header.appendChild(bottomLine)

        this.headerContainer.appendChild(header)
        child.appendTo(this.contentContainer)

        header.addEventListener('click', event => {
            this[STATE_SYMBOL].position = n
            for (let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transition = 'ease .5s'
                this.contentContainer.children[i].style.transform = `translate(${ - n * 100}%)`
            }
        })
        for (let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = '100%'
            this.contentContainer.children[i].style.height = '100%'
            this.contentContainer.children[i].style.display = 'inline-block'
        }
    }
    get children () {
        return this[PROPERTY_SYMBOL].children
    }
    getAttribute (name) {
        if (name === 'style') {
            this.root.getAttribute('style')
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute (name, value) {
        if (name === 'style') {
            this.root.setAttribute('style', value)
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

