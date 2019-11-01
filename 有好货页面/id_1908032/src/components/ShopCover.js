import { create } from '../create';
import './ShopCover.scss';

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

    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    render(){
        let isSmall = this.getAttribute('isSmall') || false;
        let element = <div class={ `shopcover ${ isSmall ? 'small' : '' }` }>
            <img src="https://gdp.alicdn.com/imgextra/i3/766568254/O1CN01jNbVh02AqNh4vIJ6k_!!766568254.jpg" alt="" class="img"/>
            <div class="bottom-bar">
                <div class="left-info">
                    <div class="level">
                        <img src={ require('../assets/icon-diamond.png') } alt=""/>
                    </div>
                    <p class="name">阿里巴巴</p>
                </div>
                <div class="right">
                    <div class="button">
                        <span class="text">进店</span>
                        <i class="iconfont icon-sanjiao icon"></i>
                    </div>
                    <i class="iconfont icon-arrow more"></i>
                </div>
            </div>
        </div>
        this.root = document.createElement("div");
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
        this[ATTRIBUTE_SYMBOL][name] = value;
        if(name == 'data'){
            this.render();
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