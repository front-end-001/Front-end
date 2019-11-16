import Timeline, { DomElementStyleNumberAnimation } from "./animation.js";
import { enableGesture } from "./gesture.js"
import css from "../assets/css/Carousel.css";

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

let styleElement = document.createElement("style");
styleElement.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(styleElement);

export default class Carousel {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL].children = [];
        
        this.created();
    }

    toHTML(){
        
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }
    created(){
        this.root = document.createElement("div");
        this.root.className = "carousel";
        this.contentContainer = document.createElement("div");
        this.contentContainer.className = "carousel";
        this.root.appendChild(this.contentContainer);
    }
    mounted(){
        this.render();
    }
    unmounted(){

    }
    update(){

    }
    render() {
        let imgs = this[ATTRIBUTE_SYMBOL]["imgs"] || [];
        if (imgs.length == 0) {
            return;
        }
        for (let e of imgs) {
            let img = document.createElement("img");
            img.className = "img";
            img.src = e;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.transition = "ease 0.5s";
            this.contentContainer.appendChild(img);
        }

        let children = Array.prototype.slice.call(this.contentContainer.children);
        let position = 0;
        let nextFrame = () => {
            let nextposition = position + 1;
            nextposition = nextposition % children.length;
            
            let current = children[position];
            let next = children[nextposition];
            
            next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * nextposition}%)`;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    current.style.transition = "";
                    current.style.transform = `translate(${- 200 - 100 * position}%)`;

                    next.style.transition = "";
                    next.style.transform = `translate(${- 100 * nextposition}%)`;

                    position = nextposition;
                })
            });
            setTimeout(nextFrame, 3000);
        };
        setTimeout(nextFrame, 3000);

        enableGesture(this.contentContainer);

        let x = 0;
        this.contentContainer.addEventListener("pan", event => {
            event.origin.preventDefault();
            for (let e of children) {
                e.style.transition = "ease 0s";
                e.style.transform = `translate(${x + event.dx}px)`;
            }
            event.origin.cancelBubble = true;
            event.origin.stopPropagation();
            event.origin.stopImmediatePropagation();
        }, {
            passive: false
        });

        this.contentContainer.addEventListener("panend", event => {
            if (event.isVertical) {
                return;
            }
            if (event.isFlick) {
                if (event.dx > 0) {
                    position = position - 1;
                } else {
                    position = position + 1;
                }
            } else {
                position = - Math.round((x + event.dx) / this.getScreenWidth());
            }
            
            position = Math.max(0, Math.min(children.length - 1, position));
            for (let e of children) {
                e.style.transition = "";
                e.style.transform = `translate(${- 100 * position}%)`;
            }
            x = - this.getScreenWidth() * position;
            event.origin.cancelBubble = true;
            event.origin.stopPropagation();
            event.origin.stopImmediatePropagation();
        }, {
            passive: false
        });
    }
    getScreenWidth() {
        return window.screen.width - 68;
    }
    log(){
        console.log("width:", this.width);
    }
    get width(){
        return this[PROPERTY_SYMBOL].width;
    }
    set width(value){
        console.log("property change");
        return this[PROPERTY_SYMBOL].width = value;
    }
    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "width") {
            this.width = value;
            console.log("attibute change");
        }
        if(name == "style") {
            this.root.style = value;
        }
        if(name == "imgs") {
            this[ATTRIBUTE_SYMBOL][name] = value;
            this.contentContainer.innerHTML = "";
            this.render();
            return;
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