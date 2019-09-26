import {enableGesture} from "./gesture.js";

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class TabView {
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
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.style.display = "flex";
        this.headerContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.flex = "1";
        this.headerContainer.style.height = "93px";
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);

        this.root.addEventListener("touchmove",function(e){ 
            e.cancelBubble = true;
            e.stopPropagation();
        }, {
            passive:false
        });

        this[STATE_SYMBOL].position = 0;

        enableGesture(this.contentContainer);

        let startTransform;

        this.contentContainer.addEventListener("panstart", event => {
            if(event.isVerticalPan)
                return;
            let width = this.contentContainer.getBoundingClientRect().width;
            startTransform = - this[STATE_SYMBOL].position * width;
        });
        this.contentContainer.addEventListener("pan", event => {
            if(event.isVerticalPan)
                return;
            event.origin.preventDefault();

            let children = this.contentContainer.children; 
            for(let child of children) {
                child.style.transition = "ease 0s";
                child.style.transform = `translate(${startTransform + event.dx}px)`;
            }
        });
        this.contentContainer.addEventListener("panend", event => {
            if(event.isVerticalPan)
                return;
            event.origin.preventDefault();

            if(event.isFlick) {
                if(event.vx > 0)
                this[STATE_SYMBOL].position --;
                
                if(event.vx < 0)
                this[STATE_SYMBOL].position ++;
            } else {
                this[STATE_SYMBOL].position = - (Math.round((startTransform + event.dx) / 500));
            }
            let children = this.contentContainer.children; 

            this[STATE_SYMBOL].position = Math.max(0, Math.min(this[STATE_SYMBOL].position, children.length - 1));

            let width = this.contentContainer.getBoundingClientRect().width;

            for(let child of children) {
                child.style.transition = "ease 0.5s";
                console.log(this[STATE_SYMBOL].position * width);
                child.style.transform = `translateX(${- this[STATE_SYMBOL].position * width}px)`
            }
        });


    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        this.children.push(child);

        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("div");
        header.innerText = title;
        header.style.display = "inline-block";
        header.style.height = "93px";
        header.style.fontFamily = "PingFang SC";
        header.style.fontSize = "46px";
        header.style.margin = "20px 35px 0 35px";
        this.headerContainer.appendChild(header);
        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.display = "inline-block";
            this.contentContainer.children[i].style.verticalAlign = "top";
        }

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
            this.root.style.display = "flex";
            this.root.style.flexDirection = "column"
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