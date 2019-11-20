import { create } from '../create';
import './ListShop.scss';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class ListShop {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        

        this[PROPERTY_SYMBOL].children = [];

        // this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    render(){
        let data = this.getAttribute('data') || {}
        let { icon, fans, name, items, url } = data;

        this.root = document.createElement("div");
        this.root.style.margin = '0 34px';
        let element = <div class="warp">
            <header class="shop-header">
                <img src={icon} alt="" class="header-img"/>
                <div class="text-info">
                    <h3 class="title">{name}</h3>
                    <img class="badage" src={require('../assets/icon-tmall@2x.png')} />
                </div>
                <a href={url} class="link">
                    <span class="text">进店</span>
                    <i class="iconfont icon-arrow arrow"></i>
                </a>
            </header>
            <div class="notice-info">
                <div class="icon">
                    <i class="iconfont icon-shop"></i>
                </div>
                <p class="text">{ `好店君：该店已被${ parseInt(fans) ?  Math.floor(parseInt(fans) / 10000) + '万' : '很多' }人关注，快来关注吧！` }</p>
            </div>
            <div class="image-box">
                <img src={items[0].image} alt="" class="main-img"/>
                <div class="right-imgbox">
                    {
                        items.slice(1,3).map(img => (
                            <img class="imgs" src={img.image} alt=""/>
                        ))
                    }
                </div>
            </div>
            <div class="bottom-link">
                <a href={url}><span>相似好店</span><i class="iconfont icon-arrow-s"></i></a>
            </div>
        </div>
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
            return;
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