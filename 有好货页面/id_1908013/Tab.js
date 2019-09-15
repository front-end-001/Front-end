const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

import enableGesture from './gesture'
import { Timeline, DOMElementStyleNumberAnimation } from './animation'

export default class Tab {
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
        this.headerContainer.className = 'tab-header-container'
        this.headerContainer.style.height = '45px'
        this.contentContainer.style.display = 'flex'
        this.contentContainer.style.flex = '1'
        this.contentContainer.style.whiteSpace = 'normal'
        this.contentContainer.style.overflow = 'hidden'
        this.root.appendChild(this.headerContainer)
        this.root.appendChild(this.contentContainer)
    }
    mounted () {
        enableGesture(this.contentContainer)
        let contentContainer = document.body.clientWidth
        var tl = new Timeline;

        let children = Array.prototype.slice.call(this.contentContainer.children);
        let position = 0;
        let offsetTimeStart = 0

        let startTransform;

        let offset = 0;
        this.contentContainer.addEventListener("panstart", event => {
            startTransform = - position * contentContainer;
            tl.pause();

            let currentTime = Date.now();
            if (currentTime - offsetTimeStart < 1000) {
                offset = contentContainer - ease((currentTime - offsetTimeStart) / 1000) * contentContainer;
                console.log(offset);
            } else {
                offset = 0;
            }
        });
        this.contentContainer.addEventListener("pan", event => {
            event.preventDefault()
            let current = children[position];

            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + position - 1) % children.length;
            let last = children[lastPosition];
            last.style.transition = "ease 0s";
            last.style.transform = `translate(${-contentContainer - contentContainer * lastPosition + event.dx + offset}px)`

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${contentContainer - contentContainer * nextPosition + event.dx + offset}px)`

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${-contentContainer * position + event.dx + offset}px)`
        });
        this.contentContainer.addEventListener("panend", event => {
            event.preventDefault();
            let isLeft;
            if (event.isFlick) {
                if (event.vx > 0) {
                    position--;
                    isLeft = true;
                }

                if (event.vx < 0) {
                    position++;
                    isLeft = false;
                }

            } else {
                if (event.dx > contentContainer / 2) {
                    position--
                    isLeft = true;
                } else if (event.dx < -contentContainer / 2) {
                    position++
                    isLeft = false;
                } else if (event.dx > 0) {
                    isLeft = false;
                } else {
                    isLeft = true;
                }
            }
            position = (children.length + position) % children.length;

            let current = children[position];
            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + position - 1) % children.length;
            let last = children[lastPosition];

            if(!isLeft){
                last.style.transition = "";
            } else {
                last.style.transition = "ease 0s";
            }
            last.style.transform = `translate(${-contentContainer - contentContainer * lastPosition}px)`

            if(isLeft){
                next.style.transition = "";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${contentContainer - contentContainer * nextPosition}px)`

            current.style.transition = "";
            current.style.transform = `translate(${- contentContainer * position}px)`
        });

    }

    unmounted () {

    }

    update () {

    }
    appendChild (child) {
        this.children.push(child)
        let title = child.getAttribute('tab-title') || ''
        this[PROPERTY_SYMBOL].headers.push(title)

        let header = document.createElement('div')
        header.style.display = 'inline-block'
        header.style.height = '46px'
        header.style.fontFamily = 'Microsoft YaHei'
        header.style.fontSize = '20px'
        header.className = 'tab-header'
        header.innerText = title
        this.headerContainer.appendChild(header)
        child.appendTo(this.contentContainer)

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

