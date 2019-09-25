const ATTRIBUTE_SYMBOL = Symbol('attribute')
const PROPERTY_SYMBOL = Symbol('property')

export default class TabView {
    constructor() {
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL] = Object.create(null)

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
        this.children.push(child)
        child.appendTo(this.listContainer)
        this.listContainer.style.width = `${this.children.length}00%`

        let title = child.getAttribute('tab-title') || ''
        this.headers.push(title)
        let header = document.createElement('span')
        header.innerText = title
        this.headerContainer.appendChild(header)
        this.headerContainer.children[0].classList.add('tab-active')
        header.addEventListener('click', e => { this.toggleTab(e) })

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