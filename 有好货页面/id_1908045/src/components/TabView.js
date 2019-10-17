import { enableGesture } from './../js/gesture.js'

const ATTRIBUTE_SYMBOL = Symbol('attribute')
const PROPERTY_SYMBOL = Symbol('property')
const STATE_SYMBOL = Symbol('state')

export default class TabView {
    constructor() {
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this[PROPERTY_SYMBOL].children = []
        this[PROPERTY_SYMBOL].headers = []

        this.create()
    }

    create() {
        this.root = document.createElement('div')

        this.contentContainer = document.createElement('div')
        this.contentContainer.className = 'tab-content'

        this.listContainer = document.createElement('div')
        this.listContainer.className = 'tab-content-list'
        this.contentContainer.appendChild(this.listContainer)

        this.headerContainer = document.createElement('div')
        this.headerContainer.className = 'tab-header'

        this.root.appendChild(this.headerContainer)
        this.root.appendChild(this.contentContainer)

        enableGesture(this.listContainer)
        this[STATE_SYMBOL].position = 0

        this.root.addEventListener('touchmove', event => {
            event.cancelBubble = true
            event.stopImmediatePropagation()
        }, {
                passive: false
            })

        this.listContainer.addEventListener("pan", event => {
            if (event.isVertical) {
                return
            }
            let width = this.contentContainer.getBoundingClientRect().width

            let dx = event.dx

            if (this[STATE_SYMBOL].position === 0 && event.dx > 0) {
                dx = dx / 2
            }
            if (this[STATE_SYMBOL].position === this.listContainer.children.length - 1 && event.dx > 0) {
                dx = dx / 2
            }
            // event.origin.preventDefault()
            for (let i = 0; i < this.listContainer.children.length; i++) {
                this.listContainer.children[i].style.transition = 'ease 0s'
                this.listContainer.children[i].style.transform = `translateX(${dx - width * this[STATE_SYMBOL].position}px)`
            }
        });
        this.listContainer.addEventListener("panend", event => {
            if (event.isVertical) {
                return
            }
            let position = this[STATE_SYMBOL].position
            let width = this.listContainer.getBoundingClientRect().width / 3
            event.preventDefault();
            let isLeft;
            if (event.isFlick) {
                if (event.dx > 0) {
                    position--;
                    isLeft = true;
                }

                if (event.dx < 0) {
                    position++;
                    isLeft = false;
                }
            } else {
                if (event.dx > width / 2) {
                    position--;
                    isLeft = true;
                } else if (event.dx < -(width / 2)) {
                    position++;
                    isLeft = false;
                } else if (event.dx > 0) {
                    isLeft = false;
                } else {
                    isLeft = true;
                }
            }


            // position = (children.length + position) % children.length;
            if (position < 0) {
                position = 0
            }
            if (position >= this.listContainer.children.length) {
                position = this.listContainer.children.length - 1
            }
            for (let i = 0; i < this.listContainer.children.length; i++) {
                this.listContainer.children[i].style.transition = 'ease 0s'
                this.listContainer.children[i].style.transform = `translateX(${-width * (position)}px)`
            }

            this[STATE_SYMBOL].position = position
        });

        this.listContainer.addEventListener("pancancel", event => {
        });
        //   this.listContainer.addEventListener("mousedown", event => event.preventDefault());
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
        const n = this.children.length
        this.children.push(child)
        child.setAttribute('index', n)
        child.appendTo(this.listContainer)
        this.listContainer.style.width = `${this.children.length}00%`

        let title = child.getAttribute('tab-title') || ''
        this.headers.push(title)
        let header = document.createElement('span')
        header.innerText = title
        this.headerContainer.appendChild(header)
        this.headerContainer.children[0].classList.add('tab-active')

        header.addEventListener('click', e => {
            this[STATE_SYMBOL].position = n
            // 自己
            // this.toggleTab(e)
            // 第一种
            // for(let i=0;i<this.listContainer.children.length;i++){
            //     this.listContainer.children[i].style.wisth='100%'
            //     this.listContainer.children[i].style.height='100%'
            //     this.listContainer.children[i].style.display='none'
            // }
            // child.style.display='inline-block'


            // 第二种
            for (let i = 0; i < this.listContainer.children.length; i++) {
                this.listContainer.children[i].style.wisth = '100%'
                this.listContainer.children[i].style.height = '100%'
                this.listContainer.children[i].style.transition = 'ease 0.5s'
                this.listContainer.children[i].style.transform = `translateX(${-n * (100)}%)`
            }
            for (let i = 0; i < this.headerContainer.children.length; i++) {
                this.headerContainer.children[i].classList.remove('tab-active')
            }
            header.classList.add('tab-active')

        })

        for (let i = 0; i < this.listContainer.children.length; i++) {
            this.listContainer.children[i].style.width = `${100 / this.children.length}%`
            this.listContainer.children[i].style.height = '100%'
        }
    }

    toggleTab(e) {
        let children = Array.from(e.currentTarget.parentElement.children)
        children.map(val => val.classList.remove('tab-active'))
        e.currentTarget.classList.add('tab-active')
        this.moveContent(children.findIndex(val => val == e.currentTarget))
    }

    moveContent(idx) {
        this.listContainer.style.transform = `translateX(${idx * -(100 / this.children.length)}%)`
    }


} 