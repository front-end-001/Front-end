//const WIDTH_PROPERTY_SYMBOL = Symbol("width");
//const WIDTH_ATTRIBUTE_SYMBOL = Symbol("width"); // 虽然名字一样，但是两个symbol不一样


const WIDTH_SYMBOL = Symbol("width");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("attribute");
const STATE_SYMBOL = Symbol("state");


class Carousel {
    constructor() {
        this[WIDTH_SYMBOL] = Object.create(null); // 不能用{} 避免默认的原型上的一些默认方法和成员
        this[ATTRIBUTE_SYMBOL] = Object.create(null); // 不能用{} 避免默认的原型上的一些默认方法和成员
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this.onWitdhChange = null;

        this.created();
    }

    get width() {
        return this[WIDTH_SYMBOL].width;
    }

    set width(value) {
        return this[WIDTH_SYMBOL].width = value;
    }

    log() {
        console.log("width", this.width);
    }

    getAttrigbute(name) {
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        if ("width" == name) {
            this.width = name;
            if (this.OnWidthChange) {
                this.OnWidthCange();
            }
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
        element.appendChild(this.root);
        this.mounted();
    }

    created() {

        this.root = document.createElement("div");
        this.root.style.width = "300px";
        this.root.style.height = "300px";
        //this.root.style.backgroundColor = "yellow";
        
        this[STATE_SYMBOL].h = 0;

        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 80%)`;  // 纯度、明度
    }


    mounted() {

        this.root.addEventListener("click", () =>  {
            this[STATE_SYMBOL].h += 30;
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 80%)`;
        });

    }

    unmounted() {

    }

    update() {

    }
}
