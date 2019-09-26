import enableGesture from '../gesture.js';
const PROPERTY_SYMBOL = Symbol('property');
const ATTRTiBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class Tab {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRTiBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this[STATE_SYMBOL].h = 0;

        this.created();
    }
    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }
    // lifecyle
    created() {
        this.root = document.createElement('div');
        this.root.classList.add('tab');
        this.headerContainer = document.createElement('div');
        this.headerContainer.classList.add('header-container');
        this.contentContainer = document.createElement('div');
        this.contentContainer.classList.add('content-container');
        this.contentContainer.style.whiteSpace = 'nowrap';
        this.contentContainer.style.overflow = 'hidden';
        this.contentContainer.style.height = '100%';
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);

        this[STATE_SYMBOL].h = 0;
    }
    mounted() {
        let children = Array.prototype.slice.call(this.contentContainer.children);
        let position = 0;
        enableGesture(this.contentContainer);

        let transformX = -375 * position; // 
        this.contentContainer.addEventListener('pan', event => {
            if (event.isVertical) {
                return;
            }
            for (let child of children) {
                child.style.transition = '';
                child.style.transform = `translate(${transformX + event.dx}px)`;
            }
        });

        this.contentContainer.addEventListener('panend', event => {
            console.log(event)
            if (event.isFlick) {
                event.dx > 0 ? position-- : position++;
            } else {
                // 四舍五入回弹效果
                position = -Math.round((transformX + event.dx) / 375);
            }
            // 控制边界元素回弹
            position = Math.max(0, Math.min(position, children.length - 1));
            transformX = -500 * position;
            for (let child of children) {
                child.style.transition = 'ease .5s';
                child.style.transform = `translate(${transformX}px)`;
            }
        });
    }
    unmounted() {}
    update() {}
    // methods
    appendChild(child) {
        this.children.push(child);

        let title = child.getAttribute('tab-title') || '';
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement('header');
        header.style.display = 'inline-block';
        header.innerHTML = title;
        this.headerContainer.appendChild(header);
        child.appendTo(this.contentContainer);
        for (let i = 0; i < this.contentContainer.children.length; i++) {
            this[STATE_SYMBOL].h += 20;
            this.contentContainer.children[i].style.width = '100%';
            this.contentContainer.children[i].style.height = '100%';
            this.contentContainer.children[i].style.display = 'inline-block';
            this.contentContainer.children[i].style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 80%)`;
        }
    }
    // properties
    get children() {
        return this[PROPERTY_SYMBOL].children;
    }
    // attributes
    getAttribute(name) {
        if (name == 'style') {
            return this.root.getAttribute('style');
        }
        return this[ATTRTiBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if (name == 'style') {
            this.root.setAttribute('style', value);
        }
        return this[ATTRTiBUTE_SYMBOL][name] = value;
    }
    // event
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
}
