//存储私有变量
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Carousel {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null); //比{} 纯净，不带原型prototype，与其他无关
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this.created();
    }
    //methods
    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    //lifecycle
    created() {
        this.root = document.createElement("div");
        this.root.style.width = "300px";
        this.root.style.height = "300px";
        this[STATE_SYMBOL].h = 0;
        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 100%, 50%)`;//颜色，纯度，明暗
    }
    mounted() {
        this.root.addEventListener("click", () => {
            this[STATE_SYMBOL].h += 30;
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;;
        });
    }
    unmounted() {

    }
    update() {

    }


    //log
    log() {
        console.log("width:", this.width);
    }
    //property 实现
    get width() {
        //this._property  存储变量
        return this[PROPERTY_SYMBOL].width;
    }
    set width(value) {
        return this[PROPERTY_SYMBOL].width = value;
    }
    //attribute
    getAttribute(name) {
        this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if (name == "width") {
            this.width = value; //HTML单向同步
            this.log();
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    //event
    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            //this[EVENT_SYMBOL][type] = [];
            this[EVENT_SYMBOL][type] = new Set();
        //this[EVENT_SYMBOL][type].push(listener);
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            return;
        //从数组里删除元素
        this[EVENT_SYMBOL][type].delete(listener);
        /* let events = this[EVENT_SYMBOL][type];
        for(let i=0;events.length;i++) {
            if (events[i]== listener) {
                let tmp = events[i];
                events[i] = event[events.length]
            }
        } */
    }
    triggerEvent(type) {
        if (!this[EVENT_SYMBOL]) {
            
        }
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this); //es5
        }
    }
}