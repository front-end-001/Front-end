import initGesture from '../tool/gesture'
import Component from './base/Component'

export default class TabContainer extends Component {
    // TODO 此处需再重构, 改造为return
    render () {
        this.tabContainer = document.createElement('div')
        this.tabContainer.addEventListener('touchmove', (e) => {
            e.cancelBubble = true
            e.stopImmediatePropagation()
        }, {
            passive:false
        })
        this.tabContainer.style.height = '100%'

        this.headerContainer = document.createElement('div')
        this.headerContainer.style.height = '93px'
        this.tabContainer.appendChild(this.headerContainer)

        this.contentContainer = document.createElement('div')
        this.contentContainer.style.whiteSpace = 'nowrap'
        this.contentContainer.style.flex = '1'
        this.tabContainer.appendChild(this.contentContainer)
        initGesture(this.contentContainer)
        this.setState('position', 0)
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
        this.tabContainer.appendTo = (body) => {
            body.appendChild(this.tabContainer)
        }
        return this.tabContainer
    }
    appendChild (child) {
        const title = child.getAttribute('tabTitle')
        if (!title) {
            return
        }
        const header = document.createElement('div')
        header.innerText = title
        const n = this.contentContainer.children.length
        // TODO 拿出去
        header.style.display = 'inline-block'
        header.style.height = '93px'
        header.style.fontFamily = 'PingFang SC'
        header.style.fontSize = '23px'
        header.style.color = 'white'
        header.style.margin = '25px 35px 0 0'
        header.addEventListener('click', e => {
            /*child.setAttribute("style", ``)
            const current = this.children[this[STATE_SYMBOL].position]
            current.setAttribute("style", ``)
            this[STATE_SYMBOL].position = header.id
            */
            this.setState('position', n)
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transition = "ease 0.5s"
                this.contentContainer.children[i].style.transform = `translateX(${-n * 100}%)`
            }
        })
        this.headerContainer.appendChild(header)
        child.appendTo(this.contentContainer)
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.display = "inline-block"
            this.contentContainer.children[i].style.width = "100%"
            this.contentContainer.children[i].style.height = "100%"
            this.contentContainer.children[i].style.verticalAlign = "true"
        }
    }
}
