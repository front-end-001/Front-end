
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");



class Carousel {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        
        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.style.width = `${this.width}px`;
        // this.root.style.width = `300px`;
        this.root.style.height = "300px";
        this.root.style.whiteSpace = 'nowrap';
        this.root.style.overflow = 'hidden';
        for(let i of urls){
        	let img = document.createElement('img');
        	img.style.width = '100%';
        	img.style.height = '100%';
        	img.src = i;
        	this.root.appendChild(img);
        }
        this[STATE_SYMBOL].h = 0;
        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 100%, 50%)`;
    }
    mounted(){
        this.root.addEventListener("click", () => {
            this[STATE_SYMBOL].h += 60;
            console.log(this[STATE_SYMBOL].h)
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 100%, 50%)`;
        })
    }
    unmounted(){

    }
    update(){

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
        if(name == "width") {
            this.width = value;
            this.triggerEvent("widthchange");
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