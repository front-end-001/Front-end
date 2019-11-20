
import { myCreate } from '../js/creat.js'
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Card2 {
    constructor(type) {
        this.ATTRIBUTE_SYMBOL = Object.create(null)
        this.PROPERTY_SYMBOL = Object.create(null)
        this.EVENT_SYMBOL = Object.create(null)
        this.STATE_SYMBOL = Object.create(null)
        this.created();
    }
    created() {
        this.root = document.createElement('div')
        this.root.classList.add('card-2')
    }
    updated() {

    }
    mounted() {

    }
    render() {
        let data = this.ATTRIBUTE_SYMBOL.data
        return <div>
                    <div class='card-2-head clearfix'>
                        <img src={data.icon} class='card-2-img'></img>
                        <p>{data.name}</p>
                        <img src='../image/icon-tm.png' class='icon-tm-2'></img>
                        <a class='to-shop' href={data.url}>进店 > </a>
                    </div>
                    <div class='tips'>{data.promotion}</div>
                    <div class='mt-21 img-wrap clearfix'>
                       <a href={data.items[0].url}><img src={data.items[0].image} class='img-1'></img></a>
                       <a href={data.items[1].url}> <img src={data.items[1].image} class='img-2'></img></a>
                       <a href={data.items[2].url}> <img src={data.items[2].image} class='img-2'></img></a>
                    </div>
                    <div class='like-shop'>相似好店 ></div>
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

