
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Tabview {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].header = [];
        this[PROPERTY_SYMBOL].children = [];
        
        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.headerContainer = document.createElement("div");
        this.contextContainer = document.createElement('div');
        this.contextContainer.style.width = `100%`;
        this.contextContainer.style.height = "300px";
        this.contextContainer.style.whiteSpace = 'nowrap';
        this.contextContainer.style.overflow = 'hidden';
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contextContainer);
        
    }
    mounted(){
        
    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        this.children.push(child);

        let title = child.getAttribute("tab-title") || '';
        this[PROPERTY_SYMBOL].header.push(title);

        let header = document.createElement('header');
        header.innerText = title;

        this.headerContainer.appendChild(header);

        child.appendTo(this.contextContainer);
        for(let i = 0; i < this.contextContainer.children.length; i++){
            this.contextContainer.children[i].style.width = "100%";
            this.contextContainer.children[i].style.height = "100%";
            this.contextContainer.children[i].style.display = "inline-block";
        }     

    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    
    log(){
        console.log("width:", this.width);
    }
    get width(){
        return this[PROPERTY_SYMBOL].width;
    }
    set width(value){
        return this[PROPERTY_SYMBOL].width = value;
    }
    get urls(){
    	return this[PROPERTY_SYMBOL].urls;
    }
    set urls(value){
    	return this[PROPERTY_SYMBOL].urls = value;
    }



    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "style") {
            this.width = value;
            // this.triggerEvent("widthchange");
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
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}