const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
import style from "./twoPicCardTwo.less";

import { enableGesture } from './gesture.js';
import { create } from '../create';

import Div from './Div';

import { DOMElementStyleVectorAnimation, DOMElementStyleAnimation, Timeline } from './animation';

// let styleElement = document.createElement("style");
// styleElement.innerHTML = css;
// document.getElementsByTagName("head")[0].appendChild(styleElement);


export default class TwoPicCardTwo {
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
        this.triggerEvent('didMount');
    }
    unmounted(){

    }
    update(){

    }

    render(){
        let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
        let { logo="logo31.jpg", title="极客时间旗舰店", tip="科技风 行业优质", items =[{img: 'img31.jpg'}, {img: 'img32.jpg'}] } = data
        
        return <div class={style['wrap']}>
            <div class={style['header']}>
                <img class={style['logo']} src={`/image/${logo}`}></img>
                <p class={style['banner']} >
                    <img class={style['user-icon']} src={`/image/user.png`} ></img>
                    <span class={style['test']}>该店已被3.9万人关注啦</span>
                </p>
            </div>
            <div class={style['panel']}>
                <div class={style['content']} >
                    <span class={style['title']}>{title}</span>
                    <span class={style['tip']}>{tip}</span>
                </div>
                <span class={style["enter-btn"]}>进店 ></span>
            </div>
            <div class={style['content']}>
                {
                    items.map(item=>{
                        return (
                            <img class={style['item']} src={`/image/${item.img}`}></img>
                        )
                    })
                }
            </div>
        </div>
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