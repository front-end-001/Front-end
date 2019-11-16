
import { myCreate } from '../js/creat.js'
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Card1 {
    constructor(type) {
        this.ATTRIBUTE_SYMBOL = Object.create(null)
        this.PROPERTY_SYMBOL = Object.create(null)
        this.EVENT_SYMBOL = Object.create(null)
        this.STATE_SYMBOL = Object.create(null)
        this.created();
    }
    created(){
        this.root = document.createElement('div')
        this.root.classList.add('card-1')
    }
    updated() {

    }
    mounted() {

    }
    render(){
        let data = this.ATTRIBUTE_SYMBOL.data
        return   <div class=" clearfix">
                        <div class='card-1-head clearfix'>
                        <img src={data.icon} class='card-1-img'></img>
                         <p>{data.name}</p>
                            <img src='../image/icon-tm.png' class='icon-tm-1'></img>
                        </div>
                        <a class='fr-19 img-content' href={data.items[0].url}><img  src={data.items[0].image}></img></a>
                         <a href={data.items[1].url} class='img-content'><img  src={data.items[1].image}></img></a>
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

