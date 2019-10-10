import create from './create'

const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')
import CollectionStore from './CollectionStore'

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
        return <div>
            <div class="carousel-container">

            </div>
            <div class={'title'}>超多人收藏的店！</div>
            <div class="flex" style={'margin-bottom: 10px;'}>
                <CollectionStore style={'flex:1;margin-left:12px;margin-right:6px;'}/>
                <CollectionStore style={'flex:1;margin-right:12px;margin-left:6px;'}/>
            </div>
            <div class="recommend-store">
                <header class="header">
                    <div class="flex">
                        <img src="" alt="" class="logo"/>
                        <div>
                            <h4>极客时间旗舰店</h4>
                            <i class="store-type">天猫</i>
                        </div>
                    </div>
                    <a href="" class="btn-enter">进入&gt;</a>
                </header>
                <div class="message">
                    <i></i>
                    <span>好店君：该店已被1.3万人关注，快来关注吧！</span>
                </div>
                <div class="content">
                    <div class="flex-2 large-image-container">
                        <img src="" alt=""/>
                    </div>
                    <div class="flex-1 small-image-container">
                        <div class="flex-1 ">
                            <img src="" alt=""/>
                        </div>
                        <div class="flex-1">
                            <img src="" alt=""/>
                        </div>
                    </div>
                </div>
                <footer class="footer">
                    <a href="">相似好店&gt;</a>
                </footer>
            </div>
            <div class="recommend-store">
                <header class="header">
                    <div class="flex">
                        <img src="" alt="" class="logo"/>
                        <div>
                            <h4>极客时间旗舰店</h4>
                            <i class="store-type">天猫</i>
                        </div>
                    </div>
                    <a href="" class="btn-enter">进入&gt;</a>
                </header>
                <div class="message">
                    <i></i>
                    <span>好店君：该店已被1.3万人关注，快来关注吧！</span>
                </div>
                <div class="content">
                    <div class="flex-2 large-image-container">
                        <img src="" alt=""/>
                    </div>
                    <div class="flex-1 small-image-container">
                        <div class="flex-1 ">
                            <img src="" alt=""/>
                        </div>
                        <div class="flex-1">
                            <img src="" alt=""/>
                        </div>
                    </div>
                </div>
                <footer class="footer">
                    <a href="">相似好店&gt;</a>
                </footer>
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
