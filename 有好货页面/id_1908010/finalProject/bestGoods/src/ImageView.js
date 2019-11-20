import {PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL, EVENT_SYMBOL, STATE_SYMBOL} from '../lib/consts'
import {enableGesture} from '../lib/gesture'

export default class ImageView  {
    constructor(props) {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this.root = document.createElement("img")
        this.didCreate()
    }   

    didCreate(){
       this.root.addEventListener('dragstart', event => {
           event.preventDefault();
       })

    }

    appendTo(element) {
        element.appendChild(this.root)
    }

    setAttribute(name, value) {
        if (name == "className") {
            return this.root.className = value;
        } else {
            this.root.setAttribute(name, value)
        }

        return this[PROPERTY_SYMBOL][name] = value;
    }

    getAttribute(name) {
        if (name == 'style') {
            return this.root.getAttribute(name)
        }
        if (name == 'className') {
            return this.root.className;
        }
        return this[PROPERTY_SYMBOL][name];
    }
}