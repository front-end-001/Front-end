const PROPERTY_SYMBOL = Symbol('property');
const ATTRTiBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class Div {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRTiBUTE_SYMBOL] = Object.create(null);
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
    // lifecyle
    created() {
        this.root = document.createElement('div');

        this[STATE_SYMBOL].h = 0;
    }
    mounted() {}
    unmounted() {}
    update() {}
    // methods
    appendChild(child) {
        this.children.push(child);

        child.appendTo(this.root);
        for (let i = 0; i < this.root.children.length; i++) {
            this.root.children[i].style.width = '100%';
            this.root.children[i].style.height = '100%';
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
