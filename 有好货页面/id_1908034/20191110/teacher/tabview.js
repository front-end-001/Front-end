import {enableGesture} from '../gesture';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class TabView {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);


        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
        this.root.style.display = "flex";
        this.headerContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.flex = "1";
        this.headerContainer.style.height = "93px";
        this.headerContainer.style.backgroundColor = "#9e48ff";
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
        this[STATE_SYMBOL].position = 0;
        enableGesture(this.contentContainer);
        this.root.addEventListener("touchmove", function (e) {
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive: false
        });
        this.contentContainer.addEventListener("pan", event => {
            if (event.isVertical) return;
            event.preventDefault();
            let width = this.contentContainer.getBoundingClientRect().width;
            let dx = event.dx;
            if (this[STATE_SYMBOL].position === 0 && event.dx > 0)
                dx = dx / 2;

            if (this[STATE_SYMBOL].position === this.contentContainer.children.length - 1 && event.dx < 0)
                dx = dx / 2;
            for (let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transition = 'transform ease 0s';
                this.contentContainer.children[i].style.transform = `translateX(${dx - width * this[STATE_SYMBOL].position}px)`;
            }
        });
        this.contentContainer.addEventListener("panend", event => {
            if (event.isVertical) return;
            event.preventDefault();
            let width = this.contentContainer.getBoundingClientRect().width;
            if (event.isFlick) {
                if (event.dx > 0) {
                    this[STATE_SYMBOL].position--;
                }

                if (event.dx < 0) {
                    this[STATE_SYMBOL].position++;
                }

            } else {
                if (event.dx > width / 2) {
                    this[STATE_SYMBOL].position--;
                } else if (event.dx < -width / 2) {
                    this[STATE_SYMBOL].position++;
                } else {
                }

            }
            if (this[STATE_SYMBOL].position < 0) {
                this[STATE_SYMBOL].position = 0;
            } else if (this[STATE_SYMBOL].position >= this.contentContainer.children.length) {
                this[STATE_SYMBOL].position = this.contentContainer.children.length - 1;
            }
            for (let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transition = 'transform ease 0.5s';
                this.contentContainer.children[i].style.transform = `translateX(${-width * this[STATE_SYMBOL].position}px)`;
            }
            for (let i = 0; i < this.headerContainer.children.length; i++) {
                if (i === this[STATE_SYMBOL].position) {
                    this.headerContainer.children[i].style.opacity = "inherit";
                } else {
                    this.headerContainer.children[i].style.opacity = "0.5";
                }
            }

        });
    }

    mounted() {

    }

    unmounted() {

    }

    update() {

    }

    get style() {
        return this.root.style;
    }

    appendChild(child) {
        this.children.push(child);
        let n = this.children.length - 1;
        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("div");
        header.innerText = title;
        header.style.display = "inline-block";
        header.style.height = "93px";
        header.style.lineHeight = "35px";
        header.style.fontFamily = "PingFang SC";
        header.style.fontSize = "46px";
        header.style.margin = "20px 35px 0 35px";
        header.style.letterSpacing = "0px";
        header.style.color = "#FFFFFF";
        if (n > 0) {
            header.style.opacity = "0.5";
        }
        this.headerContainer.appendChild(header);
        header.addEventListener('click', event => {
            this[STATE_SYMBOL].position = n;
            for (let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transition = 'transform ease 0.5s';
                this.contentContainer.children[i].style.transform = `translateX(${-n * 100}%)`;
                if (i !== n) {
                    this.headerContainer.children[i].style.opacity = "0.5";
                } else {
                    this.headerContainer.children[i].style.opacity = "inherit";
                }

            }
        });
        child.appendTo(this.contentContainer);
        for (let i = 0; i < this.contentContainer.children.length; i++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.verticalAlign = "top";
            this.contentContainer.children[i].style.display = "inline-block";
        }

    }


    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    getAttribute(name) {
        if (name == "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }

    setAttribute(name, value) {
        if (name == "style") {
            this.root.setAttribute("style", value);
            this.root.style.display = "flex";
            this.root.style.flexDirection = "column"
        }

        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }

    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }

    triggerEvent(type) {
        if (!this[EVENT_SYMBOL][type])
            return;
        for (let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}