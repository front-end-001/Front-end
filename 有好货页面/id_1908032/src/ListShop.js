import { create } from './create';
import Div from './Div';

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

        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.style.margin = '0 34px';
        let element = <div class="warp">
            <header class="shop-header">
                <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p672363704.webp" alt="" class="header-img"/>
                <div class="text-info">
                    <h3 class="title">梦境折射出的不堪现实</h3>
                    <i class="badage"></i>
                </div>
                <a href="" class="link"></a>
            </header>
            <div class="notice-info">
                <i class="icon"></i>
                <p class="text">逃避现实有许多方法，躲避，掩盖，假装不知…但梦境是赤裸裸的</p>
            </div>
            <div class="image-box">
                <img src="https://img14.360buyimg.com/babel/s1180x940_jfs/t1/59905/38/13532/82667/5dad648eEbda8c289/4184095b875ca7f3.jpg" alt="" class="main-img"/>
                <div class="right-imgbox">
                    <img class="imgs" src="https://img30.360buyimg.com/pop/s1180x940_jfs/t1/92474/18/367/73678/5dad0899E948bda74/8dc001c19582c512.jpg" alt=""/>
                    <img class="imgs" src="https://imgcps.jd.com/ling/8052643/6IKJ5bmy6IKJ6ISv5oqY5omj54ug/54m55oOg54m55Y2W/p-5bd8253082acdd181d02f9e8/30609fb0/590x470.jpg" alt=""/>
                </div>
            </div>
            <div class="bottom-link">
                <a href="">相似好店</a>
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