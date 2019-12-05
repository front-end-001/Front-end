import {PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL, EVENT_SYMBOL, STATE_SYMBOL} from '../lib/consts'

export default class Fragment  {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this.property.children = []
        this.root = document.createDocumentFragment();
    }

    appendTo(element) {
        element.appendChild(this.root);
    }

    appendChild(child) {
        this.children.push(child)
        child.appendTo(this.root)
    }

    getAttribute(name){
        if(name == 'className'){
            return this.root.className
        } 
    }
    setAttribute(name, value) {
        if (name == 'className') {
            this.root.className = value
            return;
        }
    }

    get children(){
        return this.property.children;
    }

    get property() {
        return this[PROPERTY_SYMBOL]
    }

    get attrs() {
        return this[ATTRIBUTE_SYMBOL]
    }

    get events() {
        return this[EVENT_SYMBOL]
    }

    get state() {
        return this[STATE_SYMBOL]
    }
}