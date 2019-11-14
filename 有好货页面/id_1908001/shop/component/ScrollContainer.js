import Component from './Component'

export default class ScrollContainer extends Component {
    init () {
        super.init()
        /*this.placeHolder = document.createElement('div')
        this.placeHolder.innerText = '加载更多....'
        this.container.appendChild(this.placeHolder)*/
        // let isTriggered = false
        this.container.addEventListener('scroll', e => {
            console.log('.............')
            e.preventDefault()
            const r = this.container.getBoundingClientRect()
            // const placeHolderElement = this.placeHolder.getBoundingClientRect()
            console.log('fcccc', this.container.scrollHeight, this.container.scrollTop, r.height)
            if (this.container.scrollHeight - this.container.scrollTop <= r.height) {
                this.triggerEvent('on-scrollEnd')
            }
            /*if (r.bottom < placeHolderElement.top && !isTriggered) {
                isTriggered = true
                this.triggerEvent('on-scrollEnd')
            }*/
        })
    }
}
