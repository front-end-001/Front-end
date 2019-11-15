import {create} from "../create.js";
import Div from "./Div.js";
import css from "../assets/css/ShopImgView.css";

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

let styleElement = document.createElement("style");
styleElement.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(styleElement);

let isOdd = false;

export default class ShopImgView {
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

    addStyle(){

    }

    created(){
        this.root = document.createElement("div");
        this.root.className = "shop-imgView";
    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }
    render(){
        let imgContainer = document.createElement("div");
        this.root.appendChild(imgContainer);
        imgContainer.className = "imgs";
        let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
        let len = Math.min(data.length, 3);
        isOdd = !isOdd;
        for (let i = 0; i < len; i++) {
            let className = "img " + (isOdd ? "odd" : "even") + "pic" + (i + 1);
            if ((isOdd && i == 0) || (!isOdd && i == 0)) {
                this.renderMaxImg(data[i], className).appendTo(imgContainer);
            } else {
                this.renderMinImg(data[i], className).appendTo(imgContainer);
            }
        }
    }

    renderMaxImg(item, className) {
        return <Div class={className}>
                <img style="height: 100%;width:100%" src={item.pic}></img>
                <Div class="bottom">
                    <Div class="bottomleft">
                        <img class="shopImg" src={item.shopImg}></img>
                        <Div class="shopName">{item.shop}</Div>
                    </Div>
                    <Div class="maxEnterShop">进店 ></Div>
                </Div>
            </Div>
    }

    renderMinImg(item, className) {
        return <Div class={className}>
                <img style="height: 100%;width:100%" src={item.pic}></img>
                <Div class="bottom">
                    <Div class="bottomleft">
                        <img class="shopImg" src={item.shopImg}></img>
                        <Div class="shopName">{item.shop}</Div>
                    </Div>
                    <Div class="minEnterShop"> ></Div>
                </Div>
            </Div>
    }

    get style(){
        return this.root.style;
    }

    appendChild(child){
        this.children.push(child);
        child.appendTo(this.root);
        this.root.appendChild(this.placeHolder);
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
        if(name == "data") {
            this[ATTRIBUTE_SYMBOL][name] = value;

            this.root.innerHTML = "";
            this.render();

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
    triggerEvent(type, ...args){
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this, ...args);
    }
}