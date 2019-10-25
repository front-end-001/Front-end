// save value of width
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Wrapper {
    // config only once.
    constructor(type) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null); //不建议使用 {}; 不再找原型链？ 
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
       
        
        this[PROPERTY_SYMBOL].children = [];

        //this.created();
        this.root = document.createElement(type);
    }

    appendTo(element) {
        element.appendChild(this.root);
    }


    appendChild(child) {
        this.children.push(child);
        child.appendTo(this.root);
    }

    
    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    getAttribute(name) {
        return this.root.getAttribute(name);
    }

    setAttribute(name, value) {
        //设置CSS样式格式
        if(name == "style" && typeof value == "object") {
            for(let p in value) {
                this.root.style[p] = value[p];
            }
            return;
        }
        this.root.setAttribute(name, value);
    }

    addEventListener(type, listener) {
        this.root.addEventListener(...arguments);
    }

    removeEventListener(type, listener) {
        this.root.removeEventListener(...arguments);
    }

   
}