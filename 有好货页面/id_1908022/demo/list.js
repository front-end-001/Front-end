const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class List{
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this.create();
    }



    create(){
        this.root = document.createElement('div');
        this.left = document.createElement('div');
        this.rightTop = document.createElement('div');
        this.rightBottom = document.createElement('div');
        this.root.appendChild(this.left);
        this.root.appendChild(this.rightTop);
        this.root.appendChild(this.rightBottom);
    }

    mounted(){
        this.root.style.width = '100px';
        this.root.style.height = '100px';
    }

    unmounted(){

    }

    update(){

    }

    appendTo(Element){
        Element.appendChild(this.root);
        this.mounted();
    }



    setAttribute(name, value){
        if(name == 'style'){
            this.root.setAttribute(name, value);
        }

        this[ATTRIBUTE_SYMBOL][name] = value;
    }

    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name];
    }


    addEventListener(name,listener){
        if(!this[EVENT_SYMBOL][name])
            this[EVENT_SYMBOL][name] = new Set;
        this[EVENT_SYMBOL][name].add(listener);
    }

    removeEventListener(name, listener){
        if(!this[EVENT_SYMBOL][name])
            return;
        this[EVENT_SYMBOL][name].delete(listener);
    }

    triggerEvent(name){
        if(!this[EVENT_SYMBOL][name])
            return;
        for(let listener of this[EVENT_SYMBOL][name])
            listener();
    }


}