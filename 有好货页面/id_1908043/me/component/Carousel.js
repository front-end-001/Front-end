import {PROPERTY, ATTRIBUTE, EVENT, STATE } from '../symbol';
import BaseComponent from './BaseComponent'


export default class Carousel extends BaseComponent  {
    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.style.width = "300px";
        this.root.style.height = "300px";
        this[STATE].h = 0;
        this.root.style.backgroundColor = `hsl(${this[STATE].h}, 100%, 50%)`;
    }
    mounted(){
        this.root.addEventListener("click", () => {
            this[STATE].h += 60;
            this.root.style.backgroundColor = `hsl(${this[STATE].h}, 60%, 70%)`;
        })
    }

    log(){
        console.log("width:", this.width);
    }
    get width(){
        return this[PROPERTY].width;
    }
    set width(value){
        console.log('set width', value);
        return this[PROPERTY].width = value;
    }
    getAttribute(name){
        return this[ATTRIBUTE][name]
    }
    setAttribute(name, value){
        console.log('setAttribute', name, value);
        if(name == "width") {
            this.width = value;
            // this.triggerEvent("widthchange");
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
        for(let event of this[EVENT][type])
            event.call(this);
    }
}