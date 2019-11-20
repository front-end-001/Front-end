
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class CarouselItem {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }
    appendChild(child){
        this.children.push(child);
        child.style='width: 100%;height: 100%;display: inline-block;transition: ease 0.5s';
    }
    created(){
        this.root = document.createElement("img");
        this.root.src=this[ATTRIBUTE_SYMBOL].src;
        this.root.style= "background:yellow;width: 500px;height: 300px;white-space: nowrap;overflow: hidden";
        
    }
    mounted(){ //？@nyc
      
    }
    get src(){
        return this[ATTRIBUTE_SYMBOL].src;
    }
    unmounted(){

    }
    update(){

    }
    
    log(){
        console.log("width:", this.width);
    }
    get width(){
        return this[PROPERTY_SYMBOL].width;
    }
    set width(value){
        console.log("property change");
        return this[PROPERTY_SYMBOL].width = value;
    }
    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "width") {
            this.width = value;
            console.log("attibute change");
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type){
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}