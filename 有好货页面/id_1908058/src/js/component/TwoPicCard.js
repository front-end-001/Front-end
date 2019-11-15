const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
import style from "./twoPicCard.less";
import StoreInformation from './StoreInformation';

import { enableGesture } from './gesture.js';
import { create } from '../create';

import Div from './Div';

import { DOMElementStyleVectorAnimation, DOMElementStyleAnimation, Timeline } from './animation';

// let styleElement = document.createElement("style");
// styleElement.innerHTML = css;
// document.getElementsByTagName("head")[0].appendChild(styleElement);


export default class TwoPicCard {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    appendTo(element){
        element.appendChild( this.root );
        this.mounted();
    }

    created(){
        this.root = document.createElement("div")
        this.render().appendTo( this.root );
    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }

    render(){
        let data = this[ATTRIBUTE_SYMBOL]["data"] || {};
        
        let { imgLeft="img1.png", imgRight= "img2.png", logo="logo.png"} = data;
        
        return (
            <div class={style['wrap']}>
                <StoreInformation title={data.title} logo={logo} />
                <div class={style['content']}>
                    <img src={`../../image/${imgLeft}`} />
                    <img src={`../../image/${imgRight}`} />
                </div>
            </div>
        )
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
            return this.root.setAttribute("style", value);
        }
        if(name == "data"){
            this[ATTRIBUTE_SYMBOL][name] = value;
            this.root.innerHTML = "";
            this.render().appendTo( this.root );
            return value
        }

        if( name == "className"){
            this[ATTRIBUTE_SYMBOL][name] = value;
            this.root.classList.add(value);
            return
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