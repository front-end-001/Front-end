import {PROPERTY, ATTRIBUTE, EVENT, STATE } from '../symbol';


export default class Base {
    constructor(config){
        this[PROPERTY] = Object.create(null);
        this[ATTRIBUTE] = Object.create(null);
        this[EVENT] = Object.create(null);
        this[STATE] = Object.create(null);

        this[PROPERTY].children = [];

        this.created(config);
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
    }

    mounted(){

    }

    unmounted(){

    }
    update(){

    }

    appendChild(child) {
        this.children.push(child)
        child.appendTo(this.root)
    }

    get children() {
        return this[PROPERTY].children;
    }

    getDOM () {
        return this.root;
    }
    getAttribute(name){
        if (name == 'style') {
            return this.root.getAttribute('style')
        }
        if(name === 'class') {
            return this.root.getAttribute('class');
        }
        return this[ATTRIBUTE][name]
    }
    setAttribute(name, value){
        if (name == 'style') {
            this.root.setAttribute('style', value)
        }
        if(name === 'class') {
            this.root.setAttribute('class', value);
        }
        return this[ATTRIBUTE][name] = value;
    }
    addEventListener(type, listener){
        if(!this[EVENT][type])
            this[EVENT][type] = new Set;
        this[EVENT][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT][type])
            return;
        this[EVENT][type].delete(listener);
    }
    triggerEvent(type){
        if(!this[EVENT][type])
            return;
        for(let event of this[EVENT][type])
            event.call(this);
    }
}