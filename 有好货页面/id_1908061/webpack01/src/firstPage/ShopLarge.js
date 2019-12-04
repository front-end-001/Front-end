import css from './ShopLarge.css';
import Div from '../Div.js';
import {create} from '../create.js';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class ShopLarge {
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
        this.root.classList.add('shop-large');
        this.render().appendTo(this.root);
    }
    mounted(){

    }
    unmounted(){
    
    }
    update(){
    
    }
    render(){
        let data = this[ATTRIBUTE_SYMBOL]["data"] || {};
        let name = data.name || "";
        let icon = data.icon || "";
        let imgs = data.items || [];
        let img01 = imgs[0] || [];
        let img01_url = img01.image || "";
        let img02 = imgs[1] || [];
        let img02_url = img02.image || "";
        let img03 = imgs[2] || [];
        let img03_url = img03.image || "";
        
        return <Div>
             <div class='shop'>
                <div class='shop-top'>
                    <div class='shop-icon'>
                        <img src = {icon}></img>
                    </div>
                    <div class='shop-in'>进店 &gt;</div>
                    <div class='shop-name'>
                        <div class='text'>{name}</div>
                        <div class='tag'>天猫</div>
                    </div>
                </div>
                <div class='shop-meddle'>
                    <span class='icon' style='background-position:0px -738px;'></span>
                    <span class='text'>好店君：该店已被1.3万人关注，快来关注吧！</span>
                </div>
                 <div class='shop-bottom'>
                    <div class='big-img'>
                        <img src={img01_url}>
                        </img>
                    </div>
                    <div class='small-img'>
                        <div class='top-img'><img src={img02_url}></img></div>
                        <div class='bottom-img'><img src={img03_url}></img></div>
                    </div>
                </div>
                <div class='shop-like'>
                   相似好店 >
                </div>
            </div>
        </Div>
        
    }
    get style(){
        return this.root.style;
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
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute("style", value);
        }
        if(name == "data") {
            this[ATTRIBUTE_SYMBOL][name] = value;
            this.root.innerHTML = '';
            this.render().appendTo(this.root);
            return value;
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