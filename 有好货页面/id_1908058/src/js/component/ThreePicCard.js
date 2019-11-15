const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
import style from "./threePicCard.less";
import StoreInformation from './StoreInformation';

import { enableGesture } from './gesture.js';
import { create } from '../create';

import Div from './Div';

import { DOMElementStyleVectorAnimation, DOMElementStyleAnimation, Timeline } from './animation';

// let styleElement = document.createElement("style");
// styleElement.innerHTML = css;
// document.getElementsByTagName("head")[0].appendChild(styleElement);


export default class ThreePicCard {
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
        // console.log( this[ATTRIBUTE_SYMBOL], 'create')
        // this.root.classList.add(this[ATTRIBUTE_SYMBOL]["className"])

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
        
        let { imgLeft="img1.png", imgMiddle="img1.png", imgRight= "img2.png", logo="logo.png", title="title"} = data;
        
        return (
            <div class={style['wrap']}>
                <div class={style['header']}>
                        <StoreInformation title={title} logo={logo} />
                        <span class={style["enter-btn"]}>进店 ></span>
                </div>
                <div class={style['info']}>
                    <span class={style["info-logo"]}></span>
                    <span class={style["info-text"]}>好店君：该店已被1.3万人关注，快来关注吧！</span>
                </div>

                <div class={style['content']}>
                    <img class={style['content-left']} src={`../../image/${imgLeft}`} />
                    <div class={style['content-right']}>
                        <img class={style['content-right-top']} src={`../../image/${imgMiddle}`} />
                        <img class={style['content-right-bottom']} src={`../../image/${imgRight}`} />
                    </div>
                    
                </div>

                <div class={style['link']}>相似店铺 ></div>
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