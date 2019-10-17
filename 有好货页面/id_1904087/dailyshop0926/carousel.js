// save value of width
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export class Carousel {
    // config only once.
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null); //不建议使用 {}; 不再找原型链？ 
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.created();
        //this.onWidthChange = null;
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
        this.root.style.width = "300px";
        this.root.style.height = "300px";
        //this.root.style.backgroundColor = "yellow";

        this[STATE_SYMBOL].h = 0;
        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
    }

    mounted() {
        this.root.addEventListener("click", () => {
            //this.root.style.backgroundColor = "green";
            this[STATE_SYMBOL].h += 30;
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
        });
    }

    unmounted() {

    }

    update() {

    }
    //can't trigger this 
    // destroyed() {

    // }
    
    log() {
        console.log("width: ", this.width);
    }
    get width() {
        return this[PROPERTY_SYMBOL].width;
    }

    set width(value) {
        return this[PROPERTY_SYMBOL].width = value;
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        if(name == 'width') {
            this.width = value;
            //this.log();
            if(this.onWidthChange) {
                this.onWidthChange();
            }
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    addEventListener(type, listener) {
        if(!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set();
        }
        this[EVENT_SYMBOL][type].add(listener);
    }

    removeEventListener(type, listener) {
        if(!this[EVENT_SYMBOL][type]) {
            //throw new Error("no such lisnter");
            return;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }

    triggerEvent(type) {
        for(let event of this[EVENT_SYMBOL](type) ) {
            event.call(this);
        }
    }
}