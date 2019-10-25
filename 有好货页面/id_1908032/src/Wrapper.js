const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Wrapper {
    constructor(type){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        
        this[PROPERTY_SYMBOL].children = [];
        this.root = document.createElement(type);
    }

    appendTo(element){
        element.appendChild(this.root);
    }

    get children(){
        return this[PROPERTY_SYMBOL].children;
    }

    appendChild(child){
        this.children.push(child);
        child.appendTo(this.root);
    }

    getAttribute(name){
        return this.root.getAttribute(name);
    }
    setAttribute(name, value){
        if(name == 'style'){
            if(typeof value == 'object'){
                for(let key in value){
                    this.root.style[key] = value[key];
                }
            } else {
                this.root.setAttribute(name, value);
            }
        }
        this.root.setAttribute(name, value);
    }
    addEventListener(type, listener){
        this.root.addEventListener(...arguments);
    }
    removeEventListener(type, listener){
        this.root.removeEventListener(...arguments);
    }
}