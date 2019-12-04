const PORPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Div {
    constructor(config) {
        this[PORPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PORPERTY_SYMBOL].children = [];
        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
    }
    mounted() {

    }
    unmounted() {

    }
    update() {

    }

    appendChild(child) {
        this[PORPERTY_SYMBOL].children.push(child);
        child.appendTo(this.root);
    }


    get children() {
        return this[PORPERTY_SYMBOL].children;
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if (name == "style") {
            this.root.setAttribute("style", value);
            this.root.style.display = "flex";
            this.root.style.overflow = "hidden";
            this.root.style.flexWrap = "nowrap";
            this.root.style.flexShrink = "0";
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set();
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
        for(let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }
}