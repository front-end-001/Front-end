import create from './create'

const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')
import Img from './Img'

export default class ListView {
    constructor (config) {
        this.property = 1
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL].children = []
        this.created()
    }

    appendTo (element) {
        element.appendChild(this.root)
        this.mounted()
    }
    created () {
        this.root = document.createElement('div')

        this.render().appendTo(this.root)
    }
    mounted () {

    }

    unmounted () {

    }

    update () {

    }
    render () {
        let data = []
        if (this[ATTRIBUTE_SYMBOL]['data']) {
            data = this[ATTRIBUTE_SYMBOL]['data']
        }
        return <div>
            {data.map(item => {
                console.log(item)
                return <div className={'brand-store'}>
                    <div className={'flex space-between items-center store-head'}>
                        <Img class={'logo'} src={item.icon}/>
                        <div className={'tips'}>
                            <span style={'font-size: 12px'}>该店已被3.9万人关注啦</span>
                        </div>
                    </div>
                    <div className={'flex space-between items-center store-info'}>
                        <div>
                            <h2 style={'font-size: 16px;'}>{item.name}</h2>
                            <h5 style={'font-size:12px;'}>{item.promotion}</h5>
                        </div>
                        <a href={item.url} className={'enter-store'} style={'font-size:12px;'}>进店&gt;</a>
                    </div>
                    <div className={'flex space-between image-container'}>
                        {item.items.map(element => {
                            return <div className={'product-image'}>
                                <a href={element.url}>
                                    <Img src={element.image}/>
                                </a>
                            </div>
                        })}
                    </div>
                </div>
            })}
        </div>
    }
    appendChild (child) {
        this.children.push(child)
        child.appendChild(this.root)
    }
    get children () {
        return this[PROPERTY_SYMBOL].children
    }
    getAttribute (name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute (name, value) {
        if (name === 'style') {
            this.root.setAttribute('style', value)
        }
        if (name === 'data') {
            this[ATTRIBUTE_SYMBOL][name] = value
            console.log(this[ATTRIBUTE_SYMBOL])
            this.root.innerHTML = ''
            this.render().appendTo(this.root)
            return value
        }
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
