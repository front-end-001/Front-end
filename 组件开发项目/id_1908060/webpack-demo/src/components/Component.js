export const PROPERTY_SYMBOL = Symbol("property");
export const ATTRIBUTE_SYMBOL = Symbol("attribute");
export const EVENT_SYMBOL = Symbol("event");
export const STATE_SYMBOL = Symbol("state");

export default class Component {
    constructor() {
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL].children = [];
    }
    created() {
        throw new Error('should define in subclass');
    }
    mounted(){
        throw new Error('should define in subclass');
    }
    unmounted(){
        throw new Error('should define in subclass');
    }
    update(){
        throw new Error('should define in subclass');
    }
    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
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
        if(!this[EVENT_SYMBOL][type]) return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
    set children(val) {
        return this[PROPERTY_SYMBOL].children = val;
    }
    get children() {
        return this[PROPERTY_SYMBOL].children;
    }
    appendChild(child){
        this.children.push(child);
        child.appendTo(this.root);
    }
}
