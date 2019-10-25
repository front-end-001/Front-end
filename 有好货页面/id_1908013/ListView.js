import create from './create'

const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')
import CollectionStore from './CollectionStore'
import Img from './Img'
import css from './ListView.css'

let styleElement = document.createElement('style')
styleElement.innerHTML = css
styleElement.setAttribute('scoped', '')
document.getElementsByTagName('head')[0].appendChild(styleElement)


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
        this.root.classList.add('list-view')
        this.render().appendTo(this.root)
    }
    mounted () {

    }

    unmounted () {

    }

    update () {

    }
    render () {
        let mostFavourateShops = []
        let recommendedShops = []
        if (this[ATTRIBUTE_SYMBOL]['data']) {
            mostFavourateShops = this[ATTRIBUTE_SYMBOL]['data']['mostFavourateShops']
            recommendedShops = this[ATTRIBUTE_SYMBOL]['data']['recommendedShops']
        }
        return <div>
            <div class={'title'} style={'font-size:16px;'}>超多人收藏的店！</div>
            <div class="flex collection-store-group space-between" style={css.class}>
                {mostFavourateShops.map(item => {
                    return <CollectionStore data={item}/>
                })}
            </div>
            {
                recommendedShops.map(item => {
                    return <div className="recommend-store">
                        <header className="header">
                            <div className="flex">
                                <Img src={item.icon} alt="" class="logo"/>
                                <div>
                                    <h4 style={'font-size:14px;'}>{item.name}</h4>
                                    <i className="store-type" style={'font-size:10px;'}>天猫</i>
                                </div>
                            </div>
                            <a href="" className="btn-enter" style={'font-size:12px;'}>进入&gt;</a>
                        </header>
                        <div className="message flex items-center">
                            <i></i>
                            <span style={'font-size:12px;'}>好店君：该店已被{parseInt(item.fans / 10000)}万人关注，快来关注吧！</span>
                        </div>
                        <div className="content">
                            <div className=" large-image-container">
                                <Img src={item.items[0].image} style={'width:100%'}/>
                            </div>
                            <div className={'flex flex-column space-between'}>
                                <div className=" small-image-container">
                                    <Img src={item.items[1].image} style={'width:100%'}/>
                                </div>
                                <div className=" small-image-container">
                                    <Img src={item.items[2].image} style={'width:100%'}/>
                                </div>
                            </div>
                        </div>
                        <footer className="footer">
                            <a href="" style={'font-size:12px'}>相似好店&gt;</a>
                        </footer>
                    </div>
                })
            }
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
