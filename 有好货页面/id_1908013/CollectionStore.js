import create from './create'

const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')
import Img from './Img'

export default class CollectionStore {
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
        let data = this[ATTRIBUTE_SYMBOL]['data'] || {}
        let items = data.items || []
        console.log(data)
        return <div class="collection-store">
            <header class="header">
                <div class="flex store-header">
                    <Img src={data.icon} alt="" class="logo"/>
                    <div class="flex flex-column space-between">
                        <h4 class="store-name" style={'font-size:12px'}>极客时间旗舰店</h4>
                        <div>
                            <i class="store-type" style={'font-size:10px;'}>天猫</i>
                        </div>
                    </div>
                </div>
            </header>
            <div class="content flex">
                {
                    items.map(item => {
                    return <div className="image-container">
                        <Img src={item.image}/>
                    </div>
                })}
            </div>
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
        this[ATTRIBUTE_SYMBOL][name] = value
        if (name === 'data') {
            this.root.innerHTML = ''
            this.render().appendTo(this.root)
            return value
        }
        if (name === 'style') {
            this.root.style = value
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
