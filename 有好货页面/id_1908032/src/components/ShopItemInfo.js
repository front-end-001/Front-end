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
        let element = <div class="shopItemInfo">
            <div class="top-info">
                <img src="https://img.alicdn.com/tfscom/TB127a5gwDD8KJjy0FdXXcjvXXa.jpg_b.jpg" alt="" class="shop-icon"/>
                <div class="right-info">
                    <i class="iconfont icon"></i>
                    <p class="text">乐高官方旗舰店来啊</p>
                </div>
            </div>
            <div class="center-info">
                <div class="left-text">
                    <h3 class="shop-name">乐高官方旗舰店</h3>
                    <p class="shop-slogan">乐高官方旗舰店</p>
                </div>
                <div class="button">
                    <span class="text">进店</span>
                    <i class="iconfont icon-arrow icon"></i>
                </div>
            </div>
            <div class="img-list">
                <img src="https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2200595984506/O1CN01vcg0Wh1j9nEttBRLN_!!0-item_pic.jpg_460x460Q90.jpg" alt="" class="img"/>
                <img src="https://g-search2.alicdn.com/img/bao/uploaded/i4/i1/1865963391/O1CN01aGsEHv1av7cmYKLcg_!!1865963391-0-pixelsss.jpg_460x460Q90.jpg" alt="" class="img"/>
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