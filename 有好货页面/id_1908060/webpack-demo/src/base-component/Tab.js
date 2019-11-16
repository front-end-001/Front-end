const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

import enableGesture from '../js/enableGesture';

export default class Tab {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);


        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.position = 0;
        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }
    get width() {
        return this.contentContainer.clientWidth;
    }

    created(){
        this.root = document.createElement("div");
        this.headerContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");
        this.contentContainer.classList.add('carousel');
        this.headerContainer.classList.add('tab-header');
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.height = "100%";
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
    }
    mounted(){
        enableGesture(this.contentContainer);
        this.contentContainer.addEventListener('flick', this.flickHandler.bind(this));
        this.contentContainer.addEventListener('mousedown', (event) => {
            event.preventDefault();
        });
        this.headerContainer.addEventListener('click', (event) => {
            console.log(event.target);
            console.log(event.target.parent);
            if(event.target.tagName.toLowerCase() === 'header') {
                this.position = event.target.count;
                this.update();
            }
            // event.preventDefault();
        });
        this.update();
    }
    unmounted(){

    }
    update(){
        for (let child of this.contentContainer.children) {
            child.style.transition = '';
            child.style.transform = `translate(${-this.position * this.width}px)`;
        }
        [].slice.call(this.headerContainer.children).forEach((nameItem, index) => {
            console.log(nameItem);
            index === this.position ? nameItem.classList.add('current') : nameItem.classList.remove('current');
        });
    }

    appendChild(child){
        this.children.push(child);

        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("header");
        header.innerText = title;
        header.count = this.children.length - 1;
        this.headerContainer.appendChild(header);
        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.display = "inline-block";
            this.contentContainer.children[i].style.verticalAlign = "top";
        }
    }


    get children(){
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name){
        if(name == "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute("style", value);


        }

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
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
    flickHandler(event) {
        if (event.dx < 0) {
            this.position += 1;
        } else {
            this.position -= 1;
        }
        this.position = Math.max(0, Math.min(this.position, this[PROPERTY_SYMBOL].children.length - 1));
        console.log('current position', this.position);
        this.update();
    }
}
