import { create } from '../create';
import './ShopItemInfo.scss';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Div {
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
    }

    render(){
        let data = this.getAttribute('data') || {};
        let { icon, items, name, promotion, url } = data;
        return  <div class="shopItemInfo">
            <div class="top-info">
                <img src={ icon } alt="" class="shop-icon"/>
                <div class="right-info">
                    <i class="iconfont icon icon-guanzhu"></i>
                    <p class="text">{ name }</p>
                </div>
            </div>
            <div class="center-info">
                <div class="left-text">
                    <h3 class="shop-name">{name}</h3>
                    <p class="shop-slogan">{promotion}</p>
                </div>
                <a class="button" href={url}>
                    <span class="text">进店</span>
                    <i class="iconfont icon-arrow icon"></i>
                </a>
            </div>
            <div class="img-list">
                <img src={ items[0].image } alt="" class="img"/>
                <img src={ items[1].image } alt="" class="img"/>
            </div>
        </div>
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
        this[ATTRIBUTE_SYMBOL][name] = value;
        if(name == 'data'){
            this.render().appendTo(this.root);
        }
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