const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Carousel {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.created();// 创建的时候被调用

    }
    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }
    created() {
        this.root = document.createElement("div");
        this.root.style.width = "100px";
        this.root.style.height = "100px";
        this[STATE_SYMBOL].h = 0;
        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h},60%,50%)`
    }

    mounted() {
         this.root.addEventListener('click', () => {
            this[STATE_SYMBOL].h += 30;
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h},60%,50%)`
         })
    }
    unmounted() {

    }
    update() {

    }

    log() {
        console.log("width",this.width);
    }
    get width() {
       return this[PROPERTY_SYMBOL].width 
    }
    set width(value) {
        // console.log("property");
        return this[PROPERTY_SYMBOL].width = value; // return 使得和等号的语义相同
        
    }
    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if(name == "width") {
            this.width = value;//单向同步
            // if(this.onWidthChange) {
            //     this.onWidthChange();
            // }
            // this.triggerEvent("widthchage");
            // this.log();
            console.log("atributes");
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type]){
            this[EVENT_SYMBOL][type] = new Set;
        }
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type]){
            return;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type) { // 触发事件
        if(!this[EVENT_SYMBOL][type]){
           return;
        }
        for (let event of this[EVENT_SYMBOL][type]){
            event.call(this);
        }
    }


}