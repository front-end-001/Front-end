const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
import style from "./menu.less";

import { enableGesture } from './gesture.js';
import { create } from '../create';

import Div from './Div';

import { DOMElementStyleVectorAnimation, DOMElementStyleAnimation, Timeline } from './animation';

// let styleElement = document.createElement("style");
// styleElement.innerHTML = css;
// document.getElementsByTagName("head")[0].appendChild(styleElement);


export default class Menu {
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

        this.root.children[0].children[0].classList.add(style['active']);

        this.root.children[0].addEventListener('click', (e)=>{
            let target;
            if(e.target.classList.contains(style["item"])){
                target = e.target;
            }else{
                target = e.target.parentNode;
            }

            if(!target.classList.contains(style["item"])){
                target = target.parentNode;
            }

            if(target.classList.contains(style["active"])){
                return
            }

            for(let i = 0; i < this.root.children[0].children.length; i++){
                this.root.children[0].children[i].classList.remove(style["active"]);
            }
            let value = target.getAttribute('data-value');
            let animateNode = this.root.children[0].getElementsByClassName(style["animate"]);
            animateNode[0].style.zIndex = 0;
            animateNode[0].style.left = `${value*114}px`;
            setTimeout(()=>{
                target.classList.add(style["active"]);
                animateNode[0].style.zIndex = "-1";
                this.triggerEvent('click', target.getAttribute('data-value'));
            }, 300);
        })


    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }

    render(){
        let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
        let { items=[{name: '全部', value: '0' }, {name: '小惊喜', value: '1' },{name: '想不到', value: '2' }] } = data 

        return <div class={style["menu-wrap"]}>
            {items.map(item=>{
                return (
                    <div class={style["item"]} data-value={item.value}>
                        <span>{item.name}</span>
                    </div>
                )
            })}
            <div class={style["animate"]}></div>
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
    triggerEvent(type, ...args){
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this, ...args);
    }
}