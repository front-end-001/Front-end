const PROPERTY_SYMBOL = Symbol("property"); 
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class ScrollView {
    constructor() {
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
        this.root.style.width = "300px";
        this.root.style.height = "300px";
        this.headerContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.height = "100%";
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
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
        this.children.push(child);
        let title = child.getAttribute("tab-title") || "ff";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("div");
        header.innerText = title;
        this.headerContainer.appendChild(header);
        child.appendTo(this.contentContainer);
        for (let i = 0; i < this.contentContainer.children.length; i++) {
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.width = "30%";
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
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if (name = "style") {
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