import {enableGesture} from './gesture';
import {Timeline} from './teacher/animation.js';
import {DOMElementStyleNumberAnimation} from './teacher/animation.js';
import {ease} from './teacher/animation.js'

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');


export default class Carousel {
    constructor(config) {
        this[ATTRIBUTE_SYMBOL] = Object.create(null); // attribute类型使用此类型创建
        this[PROPERTY_SYMBOL] = Object.create(null); // property类型使用此类型创建
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL].children = [];
        this[ATTRIBUTE_SYMBOL].container = document.createElement("div");
        this.init(config);
    }

    appendTo(element) {
        element.appendChild(this[ATTRIBUTE_SYMBOL].container);
        this.mounted();
    }

    appendChild(child) {
        this.children.push(child);
        child.appendTo(this[ATTRIBUTE_SYMBOL].container);
    }


    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    get parentWidth() {
        let parentWidth = window.getComputedStyle(this[ATTRIBUTE_SYMBOL].container, null).width;
        return parseInt(parentWidth.replace(/px/g, ''), 10);
    }


    init(config) {
        let container = this[ATTRIBUTE_SYMBOL].container;
        this[ATTRIBUTE_SYMBOL].position = 0; // 私有属性
        this[ATTRIBUTE_SYMBOL].offsetTimeStart = 0; // 私有属性
        this[ATTRIBUTE_SYMBOL].nextPictureTimer = null; // 私有属性
        this[ATTRIBUTE_SYMBOL].timeline = new Timeline(); // 私有属性

    }


    render() {
        this[ATTRIBUTE_SYMBOL].nextPictureTimer = setTimeout(() => this.nextPicture(), 3000);
    }

    nextPicture() {
        let children = this[ATTRIBUTE_SYMBOL].children;
        let tl = this[ATTRIBUTE_SYMBOL].timeline;
        let nextPosition = this[ATTRIBUTE_SYMBOL].position + 1;

        nextPosition = nextPosition % children.length;

        let current = children[this[ATTRIBUTE_SYMBOL].position], next = children[nextPosition];
        //把next摆到正确的位置
        //next.style.transition = "ease 0s";
        next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

        this[ATTRIBUTE_SYMBOL].offsetTimeStart = Date.now();

        tl.addAnimation(new DOMElementStyleNumberAnimation(
            current,
            "transform",
            0, -this.parentWidth * this[ATTRIBUTE_SYMBOL].position,
            1000, -this.parentWidth - this.parentWidth * this[ATTRIBUTE_SYMBOL].position,
            (v) => `translateX(${v}px)`
        ));
        tl.addAnimation(new DOMElementStyleNumberAnimation(
            next,
            "transform",
            0, this.parentWidth - this.parentWidth * nextPosition,
            1000, -this.parentWidth * nextPosition,
            (v) => `translateX(${v}px)`
        ));
        tl.restart();

        this[ATTRIBUTE_SYMBOL].position = nextPosition;


        this[ATTRIBUTE_SYMBOL].nextPictureTimer = setTimeout(() => this.nextPicture(), 3000);
    }

    mounted() {

    }


    addPan() {
        let startTransform;

        let offset = 0;
        this[ATTRIBUTE_SYMBOL].container.addEventListener("mousedown", event => {
            let tl = this[ATTRIBUTE_SYMBOL].timeline;
            tl.pause();

            let currentTime = Date.now();
            if (currentTime - this[ATTRIBUTE_SYMBOL].offsetTimeStart < 1000) {
                offset = this.parentWidth - ease((currentTime - this[ATTRIBUTE_SYMBOL].offsetTimeStart) / 1000) * this.parentWidth;
                console.log(offset);
            } else {
                offset = 0;
            }

            clearTimeout(this[ATTRIBUTE_SYMBOL].nextPictureTimer);
        });
        this[ATTRIBUTE_SYMBOL].container.addEventListener("pan", event => {
            let children = this[ATTRIBUTE_SYMBOL].children;
            let current = children[this[ATTRIBUTE_SYMBOL].position];

            let nextPosition = (this[ATTRIBUTE_SYMBOL].position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + this[ATTRIBUTE_SYMBOL].position - 1) % children.length;
            let last = children[lastPosition];
            last.style.transition = "ease 0s";
            last.style.transform = `translate(${-this.parentWidth - this.parentWidth * lastPosition + event.dx + offset}px)`;

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${this.parentWidth - this.parentWidth * nextPosition + event.dx + offset}px)`;

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${-this.parentWidth * this[ATTRIBUTE_SYMBOL].position + event.dx + offset}px)`;
            // TODO: 比较 lou 的方式，后续需要优化
            window['is_carousel'] = true;
        });
        this[ATTRIBUTE_SYMBOL].container.addEventListener("panend", event => {
            let children = this[ATTRIBUTE_SYMBOL].children;
            let isLeft;
            if (event.isFlick) {
                if (event.dx > 0) {
                    this[ATTRIBUTE_SYMBOL].position--;
                    isLeft = true;
                }

                if (event.dx < 0) {
                    this[ATTRIBUTE_SYMBOL].position++;
                    isLeft = false;
                }

            } else {
                if (event.dx > this.parentWidth / 2) {
                    this[ATTRIBUTE_SYMBOL].position--;
                    isLeft = true;
                } else if (event.dx < -this.parentWidth / 2) {
                    this[ATTRIBUTE_SYMBOL].position++;
                    isLeft = false;
                } else {
                    isLeft = event.dx <= 0;
                }

            }
            this[ATTRIBUTE_SYMBOL].position = (children.length + this[ATTRIBUTE_SYMBOL].position) % children.length;

            let current = children[this[ATTRIBUTE_SYMBOL].position];
            let nextPosition = (this[ATTRIBUTE_SYMBOL].position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + this[ATTRIBUTE_SYMBOL].position - 1) % children.length;
            let last = children[lastPosition];

            if (!isLeft) {
                last.style.transition = "";
            } else {
                last.style.transition = "ease 0s";
            }
            last.style.transform = `translate(${-this.parentWidth - this.parentWidth * lastPosition}px)`;

            if (isLeft) {
                next.style.transition = "";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${this.parentWidth - this.parentWidth * nextPosition}px)`;

            current.style.transition = "";
            current.style.transform = `translate(${-this.parentWidth * this[ATTRIBUTE_SYMBOL].position}px)`;
            // TODO: 比较 lou 的方式，后续需要优化
            setTimeout(function () {
                window['is_carousel'] = false;
            }, 1200);

        });

        this[ATTRIBUTE_SYMBOL].container.addEventListener("mousedown", event => event.preventDefault());
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
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }

    getAttribute(name) {
        if (name === "style") {
            return this[ATTRIBUTE_SYMBOL].container.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }

    setAttribute(name, value) {
        if (name === "style") {
            this[ATTRIBUTE_SYMBOL].container.setAttribute("style", value);
        }
        if (name === 'pictures') {
            let data = value || [];
            let i = data.length;
            for (let d of data) {
                let e = document.createElement("img");
                e.src = d;
                this[ATTRIBUTE_SYMBOL].container.appendChild(e);
                e.style.zIndex = i++;
                e.style.width = '100%';
                e.style.height = '100%';
                e.style.display = 'inline-block';
                e.style.borderRadius = '36px';
            }
            this[ATTRIBUTE_SYMBOL].children = Array.prototype.slice.call(this[ATTRIBUTE_SYMBOL].container.children);
            enableGesture(this[ATTRIBUTE_SYMBOL].container);
            this.addPan();
            this.render();
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
}