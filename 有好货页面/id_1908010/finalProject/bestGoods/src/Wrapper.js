
import {PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL, EVENT_SYMBOL, STATE_SYMBOL} from '../lib/consts'

export default class Wrapper {
    constructor(type){
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this.property.children = []
        this.root = document.createElement(type)
    }

    appendTo(element){
        element.appendChild(this.root);
    }

    appendChild(child) {
        this.children.push(child)
        child.appendTo(this.root)
    }

    get children(){
        return this.property.children;
    }

    getAttribute(name){
        if(name == 'className'){
            return this.root.className
        } 
        return this.root.getAttribute(name);
    }
    setAttribute(name, value) {
        if (name == 'className') {
            this.root.className = value
        }
        this.root.setAttribute(name, value)
    }

    addEventListener(type, listener) {
        this.root.addEventListener(...arguments)
    }

    removeEventListener(type, listener) {
        this.root.removeEventListener(...arguments)
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