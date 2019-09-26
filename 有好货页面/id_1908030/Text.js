const PROPERTY_SYMBOL = Symbol("property"); 
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
const PAGES_SYMBOL = Symbol("pages");

export default class Text {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.text = config || "";
        this.created();
    }
    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }
    created() {
        this.root = document.createElement("div");
        this.root.innerText = this.text;
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
    getAttribute(name) {
        if (name == "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if (name == 'style') {
            this.root.setAttribute("style", value);
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