const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

class Carousel {
    constructor(config){
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement('div');
    }
    mounted(){
        this.root.addEventListener('click', () => {

        })
    }
    unmounted(){

    }
    update(){

    }
    get width(){
        return this[PROPERTY_SYMBOL].width
    }

    set width(value){
        return this[PROPERTY_SYMBOL].width = value;
    }

    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }

    serAttribute(name, value){
        if(name === 'width'){
            this.width = value
            if(this.onWidthChange)
                this.onWidthChange();
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set();

        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListenter(type, listener){
        if(!this[EVENT_SYMBOL][type])
            return;

        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type){
        for(let event of this[EVENT_SYMBOL][type]){
            event.call(this);
        }
    }
}