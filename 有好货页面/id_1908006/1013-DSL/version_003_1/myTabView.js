import {enableGesture} from "./Gesture.js"

const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");
const STATE_SYMBOL = Symbol("state");
const EVENT_SYMBOL = Symbol("event");

export class MyTabView {
    constructor() {
        console.log("call MyTabView");
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    getAttribute(name) {
        if (name == "style") {
            return this._container.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        if (name == "style") {
            this._container.setAttribute("style", value);
            this._container.style.display = "flex";
            this._container.style.flexDirection = "column";
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set;
        }

        this[EVENT_SYMBOL][type].add(listener);
    }

    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return
        }

        this[EVENT_SYMBOL][type].delete(listener);
    }

    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }


    appendTo(element) {
        console.log("TabView appendTo: ",element);
        element.appendChild(this._container);
        this.mounted();
    }

    appendChild(child) {

        let n = this[PROPERTY_SYMBOL].children.length;

        this[PROPERTY_SYMBOL].children.push(child);

        console.log("TabView appendChild: ",child);
        //let title = child.getAttribute("tab-title") || "default-title";
        let title = child.getAttribute("tab-title") || "";

        this[PROPERTY_SYMBOL].headers.push(title);
        let header = document.createElement("div");
        header.innerText = title;
        header.style.display = "inline-block";
        header.style.height = "93px";
        header.style.fontFamily = "PingFang SC"
        header.style.fontSize = "46px";
        header.style.margin = "20px 35px 0 35px";

        this._headerContainer.appendChild(header);


        child.appendTo(this._contentContainer);

        header.addEventListener("click", event => {
            console.log(n);
            this[STATE_SYMBOL].position = n;
            for (let i = 0; i < this._contentContainer.children.length; i++) {
                this._contentContainer.children[i].style.width = "100%";
                this._contentContainer.children[i].style.height = "100%";
                this._contentContainer.children[i].style.transition = "ease 0.5s";
                this._contentContainer.children[i].style.transform = `translateX(${-n*100}%)`
            }
        });


        for (let i = 0; i < this._contentContainer.children.length; i++) {
            this._contentContainer.children[i].style.width = "100%";
            this._contentContainer.children[i].style.height = "100%";
            this._contentContainer.children[i].style.verticalAlign = "top";
            this._contentContainer.children[i].style.display = "inline-block";
        }
    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }




    created() {
        this._container = document.createElement("div");

        this._container.style.display = "flex";

        this._headerContainer = document.createElement("div");
        this._contentContainer = document.createElement("div");

        this._contentContainer.style.whiteSpace = "nowrap";
        this._contentContainer.style.overflow = "hidden";
        this._contentContainer.style.height = "100%";

        this._headerContainer.style.height = "93px";

        this._container.appendChild(this._headerContainer);
        this._container.appendChild(this._contentContainer);




        this[STATE_SYMBOL].position = 0;

        enableGesture(this._contentContainer);

        this._container.addEventListener("touchmove", e=> {
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        },{
            passive: false
        });


        this._contentContainer.addEventListener("pan", event => {
            if (event.isVertical) return;

            let width = this._contentContainer.getBoundingClientRect().width;

            let dx = event.dx;

            if (this[STATE_SYMBOL].position == 0 && event.dx > 0) {
                dx = dx / 2;
            }

            if (this[STATE_SYMBOL].position == this._contentContainer.children.length - 1 && event.dx < 0) {
                dx = dx / 2;
            }

            for (let i = 0; i < this._contentContainer.children.length; i++) {
                this._contentContainer.children[i].style.transition = "transform ease 0s";
                this._contentContainer.children[i].style.transform = `translateX(${dx - width * this[STATE_SYMBOL].position}px)`;
            }
        });


        this._contentContainer.addEventListener("panend", event => {
            if (event.isVertical) return;

            let width = this._contentContainer.getBoundingClientRect().width;


            let isLeft;

            if (event.isFlick && event.isHorizontal) {
                if (event.dx > 0) { 
                    this[STATE_SYMBOL].position = this[STATE_SYMBOL].position - 1;
                    isLeft = true;
                }
                if (event.dx < 0) { 
                    this[STATE_SYMBOL].position = this[STATE_SYMBOL].position + 1;
                    isLeft = false;
                }
            } else { 
                if (event.dx > width / 2) { 
                    this[STATE_SYMBOL].position = this[STATE_SYMBOL].position - 1;
                    isLeft = true;
                } else if (event.dx < -width / 2) { 
                    this[STATE_SYMBOL].position = this[STATE_SYMBOL].position + 1;
                    isLeft = false;
                } else if (event.dx > 0) {
                    isLeft = false; 
                } else {
                    isLeft = true; 
                }

            }

            if (this[STATE_SYMBOL].position < 0) {
                this[STATE_SYMBOL].position = 0;
            }
            if (this[STATE_SYMBOL].position >= this._contentContainer.children.length) {
                this[STATE_SYMBOL].position = this._contentContainer.children.length - 1;
            }

            for (let i = 0; i < this._contentContainer.children.length; i++) {
                this._contentContainer.children[i].style.transition = "transform ease 0.5s";
                this._contentContainer.children[i].style.transform = `translateX(${- width * this[STATE_SYMBOL].position}px)`;
            }
        });


        console.log("myTabView::created call end")
    }


    mounted() {

    }


    unmounted() {

    }

    update() {

    }

}
