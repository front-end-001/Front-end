
import {PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL, EVENT_SYMBOL, STATE_SYMBOL} from '../lib/consts'


export default class Component {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this.root = document.createElement('div')
    }

    appendTo(element){
        element.appendChild(this.root);
        this.didMounted();
    }

    didCreate(){}

    didMounted(){}

    didUnmounted(){}

    didUpdate(){}

    get property() { return this.property }
    set property(value) {this.property = value}
    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value) {
        return this[ATTRIBUTE_SYMBOL][name] = value
    }

    addEventListener(type, listener) {
        if(!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set
        }
        this[EVENT_SYMBOL][type].add(listener)
    }

    removeEventListener(type, listener) {
        if(!this[EVENT_SYMBOL][type]) {
            throw new Error(`no such event ${type}`)
        }
        this[EVENT_SYMBOL][type].delete(listener)
    }

    triggerEvent(type) {
        if(!this[EVENT_SYMBOL][type]) return;
        this[EVENT_SYMBOL][type].forEach(event => {
            event.call(this);
        })
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