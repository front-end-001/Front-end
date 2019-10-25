const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Div {
    constructor(type){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL].children = [];

        this.created(type);
    }

    appendTo(element){
        element.appendChild(this.root);
    }

    created(type){
        this.root = document.createElement(type);
        
    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        this.children.push(child);
        child.appendTo(this.root);
    }

    get children(){
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name){
        return this.root.getAttribute(name);
    }
    setAttribute(name, value){
        return this.root.setAttribute(name, value);
    }
    addEventListener(type, listener){
        this.root.addEventListener(...arguments);
    }
    removeEventListener(type, listener){
        this.root.removeEventListener(...arguments);
    }
    triggerEvent(type){
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}