import { myCreate } from '../tool/create'
import Div from './Div'
import css from './css/ListView.css'

const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol("property")
const EVENT_SYMBOL = Symbol("property")
/*
const styleElement = document.createElement('style')
styleElement.innerHTML = css
document.getElementsByTagName('head')[0].appendChild(styleElement)
*/
export default class ListView {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this.init()
    }
    init () {
        this.container = document.createElement('div')
        this.render().appendTo(this.container)
    }
    appendTo (body) {
        body.appendChild(this.container)
    }
    appendChild(child){
        this.children.push(child)
        child.appendTo(this.container)
    }
    render () {
        const data = this[ATTRIBUTE_SYMBOL].data || []
        return <div>
            {
                data.map(shop => {
                    const icon = './static/' + shop.icon
                    return <div style={css.shop}>
                        <div style={css.shopInfo}>
                            <img src={icon} style={css.icon} />
                            <span style={css.shopName}>
                                <span>{shop.name}</span>
                                <img src='./static/icon-tmall@2x.png' style={css.tmallImg} />
                            </span>
                        </div>
                        <div style={css.shopDesc}>{shop.desc}</div>
                        <div style={css.goods}>
                            {
                                shop.goods.map((good, index) => {
                                    const img = './static/' + good.img
                                    return <div style={index === 0 ? css.goodsFirstDiv : css.goodsSecondDiv}>
                                        <img src={img} style={css.goodImg} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                })
            }
        </div>
    }
    get children(){
        return this[PROPERTY_SYMBOL].children || []
    }
    setAttribute (name, value) {
        if (name === 'style') {
            this.container.setAttribute('style', value)
            return
        }
        if (name === 'data') {
            this[ATTRIBUTE_SYMBOL][name] = value
            // this.container.innerHTML = ''
            this.render().appendTo(this.container)
            return
        }
        if (name === 'class') {
            this.container.classList.add(value)
            return
        }
        return this[ATTRIBUTE_SYMBOL][name] = value
    }
    getAttribute (name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type){
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}
