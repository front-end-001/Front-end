import { create } from '../../create';
import './index.scss';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Shop {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        

        this[PROPERTY_SYMBOL].children = [];

        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.innerHTML = '';
        this.render();
    }

    render(){
        if(!this.getAttribute('data')) return;

        let data = this.getAttribute('data') || {}
        let { icon, name, items } = data;
        this.root.classList.add('shop-view');
        let element = <div class="inner">
            <div class="top-info">
                <img class="logo" src={icon} alt="" />
                <div class="right-info">
                    <h3 class="title">{name}</h3>
                    <img class="badage" src={require('./icon-tmall2@2x.png')} />
                </div>
            </div>
            <div class="image-box-list">
                {
                    Array.isArray(items) && items.map(image => (
                        <img class='image' src={image.image} alt=""/>
                    ))
                }
            </div>
        </div>
        console.log(element)
        element.appendTo(this.root);
    }

    mounted(){

    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        this.children.push(child);
        child.appendTo(this.root);
    }


    get children(){
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name){
        if(name == "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute("style", value);
        }
        if(name == 'data'){
            this[ATTRIBUTE_SYMBOL][name] = value;
            this.render();
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
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
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}