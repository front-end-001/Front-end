import {MyDiv} from "./myDiv.js"
import {myCreate} from "./myCreate.js"

const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");
const EVENT_SYMBOL= Symbol("event");

export class MyListView {
    constructor() {
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    getAttribute(name) {
        if(name === "style") {
            return this._container.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        if(name === "style") {
            this._container.setAttribute("style", value);
        }

        if(name === "data") {
           this[ATTRIBUTE_SYMBOL][name] = value;
           this._container.innerHTML = "";
           this.render().appendTo(this._container);
           return value;
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
        element.appendChild(this._container);
        this.mounted();
    }

    appendChild(child) {
        
        this[PROPERTY_SYMBOL].children.push(child);

        child.appendTo(this._container);

        this._container.append(this.placeHolder);

    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    get style() {
        return this._container.style;
    }



    created() {
        this._container = document.createElement("div");

        this.render().appendTo(this._container);

   }


    mounted() {
      
    }



    unmounted() {

    }

    update() {

    }

    render() {
        let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
        return  <div>
                {
                    data.map(item => (
                        <div>
                            <span>Key: {item.a} </span>
                            <span>,  Value: {item.b}</span>
                        </div>
                    ))
                }
            </div>
    }

}
