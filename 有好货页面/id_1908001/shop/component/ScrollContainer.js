import Component from './base/Component'

export default class ScrollContainer extends Component {
    init () {
        super.init()
        this.getContainer().style['overflow-y'] = "scroll"
        this.getContainer().style['-webkit-overflow-scrolling'] = "touch"
    }
    addEventListener(type, listener){
        const scrollEnd = 'on-scrollEnd'
        if (type === scrollEnd) {
            super.addEventListener('touch', e => {
                e.preventDefault()
            })
            super.addEventListener('scroll', e => {
                e.preventDefault()
                const container = this.getContainer()
                const r = container.getBoundingClientRect()
                if (container.scrollHeight - container.scrollTop <= r.height) {
                    listener()
                }
            })
        }
    }
}
