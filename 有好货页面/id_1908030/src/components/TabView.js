import { enableGesture } from "./gesture.js"
import css from "../assets/css/TabView.css";

const PROPERTY_SYMBOL = Symbol("property"); 
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

let styleElement = document.createElement("style");
styleElement.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(styleElement);


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
        this.root.classList.add("tab-view");
        this.root.style.display = "flex";
        this.root.style.flexDirection = "column";
        this.headerContainer = document.createElement("div");
        this.headerContainer.classList.add("headerContainer");
        this.headerContainer.style["z-index"] = 0;
        this.contentContainer = document.createElement("div");
        this.contentContainer.classList.add("contentContainer");
        this.contentContainer.style["z-index"] = 0;
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style["overflow-x"] = "hidden";
        this.contentContainer.style.flex = "1";
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);

        enableGesture(this.contentContainer);

        this[STATE_SYMBOL].position = 0;

        this.root.addEventListener("touchmove", event => {
            event.cancelBubble = true;
            event.stopPropagation();
            event.stopImmediatePropagation();
        }, {
            passive: false
        });

        this.contentContainer.addEventListener("pan", event => {
            if(event.isVertical) {
                return;
            }
            event.origin.preventDefault();
            //获取元素宽度
            let width = this.contentContainer.getBoundingClientRect().width;

            let dx = event.dx;

            //console.log(dx);

            if (this[STATE_SYMBOL].position == 0 && event.dx > 0) {
                dx = dx / 2;
            }

            if (this[STATE_SYMBOL].position == this.contentContainer.children.length - 1 && event.dx < 0) {
                dx = dx / 2;
            }

            for(let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transition = `transform ease 0s`;
                this.contentContainer.children[i].style.transform = `translateX(${ dx -width * this[STATE_SYMBOL].position }px)`;
            }
            event.origin.cancelBubble = true;
            event.origin.stopPropagation();
            event.origin.stopImmediatePropagation();
        });

        this.contentContainer.addEventListener("panend", event => {
            if (event.isVertical) {
                return;
            }
            event.origin.preventDefault();
            let width = this.contentContainer.getBoundingClientRect().width;

            let isLeft;
            if (event.isFlick) {
                if (event.vx > 0) {
                    this[STATE_SYMBOL].position--;
                    isLeft = true;
                }

                 if (event.vx < 0) {
                    this[STATE_SYMBOL].position++;
                    isLeft = false;
                }

             } else {
                if (event.dx > width / 2) {
                    this[STATE_SYMBOL].position--
                    isLeft = true;
                } else if (event.dx < - width / 2) {
                    this[STATE_SYMBOL].position++
                    isLeft = false;
                } else if (event.dx > 0) {
                    isLeft = false;
                } else {
                    isLeft = true;
                }
            }
            //position = (children.length + position) % children.length;


             if (this[STATE_SYMBOL].position < 0) {
                this[STATE_SYMBOL].position = 0;
            }
            if (this[STATE_SYMBOL].position >= this.contentContainer.children.length) {
                this[STATE_SYMBOL].position = this.contentContainer.children.length - 1;
            }
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transition = `transform ease .5s`;
                this.contentContainer.children[i].style.transform = `translateX(${ -width * this[STATE_SYMBOL].position }px)`;
            }
            event.origin.cancelBubble = true;
            event.origin.stopPropagation();
            event.origin.stopImmediatePropagation();
        });
    }
    mounted() {

    }
    unmounted() {

    }
    update() {

    }
    log() {
        console.log("width", this.width);
    }
    appendChild(child) {
        let n = this.children.length;

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
        header.style.color = "white";
        this.headerContainer.appendChild(header);

        header.addEventListener("click", event => {
            this[STATE_SYMBOL].position = n;
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transition = "ease 0.5s";
                this.contentContainer.children[i].style.transform = `translateX(${ - n * 100 }%)`;
            }
        })


        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "calc(100% - 34px)";
            this.contentContainer.children[i].style['padding-top'] = "34px";
            this.contentContainer.children[i].style.verticalAlign = "top";
            this.contentContainer.children[i].style.display = "inline-block";
            this.contentContainer.children[i].style.overflow = "scroll";
            this.contentContainer.style["overflow-x"] = "hidden";
        }
    }
    get children() {
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name) {
        if (name == "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if (name == "style") {
            this.root.setAttribute("style", value);
            this.root.style.display = "flex";
            this.root.style.flexDirection = "column";
        }
        if (name == "class") {
            this.root.classList.add(value);
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set();
        }
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type) {
        if (!this[EVENT_SYMBOL][type]) {
            return;
        }
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }
}