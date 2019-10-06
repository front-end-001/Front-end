const PROTERTY_SYMBOL = Symbol('width');
const ATTRIBUTE_SYMBOL = Symbol('attrubute');
const STATE_SYMBOL = Symbol('state');
const EVENT_SYMBOL = Symbol('event');
export default class Div {
    constructor() {
        this[PROTERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROTERTY_SYMBOL].children = [];
        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    appendChild(child) {
        this.children.push(child);
        child
    }

    // lifecycle
    created() {
        this.root = document.createElement('div');
        // this[STATE_SYMBOL].hue = 0;
        // this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].hue}, 100%, 50%)`;
    }
    mounted(){
    }
    unmounted() {}
    updated() {}
    beforeDestroyed() {}

    desroyed() {}   // 无法实现

    // method
    
    // property
    get children() {
        return this[PROTERTY_SYMBOL].children;
    }
    set width(value) {
        return this[PROTERTY_SYMBOL].width = value;
    }
    // attribute
    getAttribute(name) {
        if (name == 'style') {
            return this.root.setAttribute('style', value);
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if (name == 'style') {
            this.root.setAttribute('style', value);
            this.root.style.whiteSpace = 'nowrap';
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventLister(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set();
        }
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return ;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            // event.call(this);
            event();
        }
    }
}

