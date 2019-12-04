
import { myCreate } from '../js/creat.js'
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Card4 {
    constructor(type) {
        this.ATTRIBUTE_SYMBOL = Object.create(null)
        this.PROPERTY_SYMBOL = Object.create(null)
        this.EVENT_SYMBOL = Object.create(null)
        this.STATE_SYMBOL = Object.create(null)
        this.created();
    }
    created() {
        this.root = document.createElement('div')
        this.root.classList.add('card-5')
    }
    updated() {

    }
    mounted() {

    }
    render() {
        let data = this.ATTRIBUTE_SYMBOL.data || []
        console.log(data)
        return  <div>
                        <div class='head'>
                            <div class='top-1 clearfix'>
                                <img src={data.icon} class='shop-photo'></img>
                                <div class='focur'>
                                    <img src='../image/guanzhu.png'></img>
                                    该店已被{Math.floor(data.fans/10000)}万人人关注了
                                </div>
                            </div>
                            <div class='des'>
                                <h5>{data.name}</h5>
                                {data.promotion}
                                <a class='go-shop-btn' href={data.url}>进店></a>
                            </div>
                        </div>
                        <div class='clearfix content'>
                            <a href={data.items[0].url}><img src={data.items[0].image}></img></a>
                            <a href={data.items[1].url}><img src={data.items[1].image}></img></a>
                        </div>
                 </div>
    }
    setPropoty(name, value) {
        return this[_PROPERTY_SYMBOL][name] = value
    }
    getPropoty(name) {
        return this[_PROPERTY_SYMBOL][name]
    }
    setAttribute(name, value) {
        if (name == 'style') {
            return this.root.setAttribute('style', value)
        }
        if (name == 'data') {
            this.ATTRIBUTE_SYMBOL[name] = value
            this.root.innerHTML = ''
            this.render().appendTo(this.root)
            return value
        }
        return this.root.setAttribute(name, value)
    }
    getAttribute(name) {
        return this.root.getAttribute(name)
    }

    appendTo(element) {
        element.appendChild(this.root)
    }
    appendChild(child) {
        child.appendTo(this.root)
    }
}

