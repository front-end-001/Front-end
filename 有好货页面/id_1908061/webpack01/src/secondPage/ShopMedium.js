import css from './ShopMedium.css';
import Div from '../Div.js';
import {create} from '../create.js';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class ShopMedium {
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
        this.root.classList.add('shop-medium');
        this.render().appendTo(this.root);
    }
    mounted(){

    }
    unmounted(){
    
    }
    update(){
    
    }
    render(){
        let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
        let data01 = data[0] || {};
        let item01 = data01.items || [];
        let img01 = item01[0] || {};
        let img01_url = img01.image || "";

        let data02 = data[1] || {};
        let item02 = data02.items || [];
        let img02 = item02[0] || {};
        let img02_url = img02.image || "";

        let data03 = data[2] || {};
        let item03 = data03.items || [];
        let img03 = item03[0] || {};
        let img03_url = img03.image || "";
        
        return <Div>
             <div class='shop'>
                 <div class='shop-img'>
                    <div class='big-img'>
                        <img src={img01_url}>
                        </img>
                    </div>
                    <div class='small-img'>
                        <div class='top-img'><img src={img02_url}></img></div>
                        <div class='bottom-img'><img src={img03_url}></img></div>
                    </div>
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
        if(name == "float") {
            let bigImg = document.getElementsByClassName('big-img')[0];
            let smallImg = document.getElementsByClassName('small-img')[0];
            // bigImg.setAttribute("style","float:right");
            // smallImg.setAttribute("style","float:left");

            // bigImg.style.cssFloat = value;
            // smallImg.style.cssFloat = 'left';
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