
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Div {
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
        this.root.style.width = "100%";
        this.root.style.height = "100%";
        this.root.style.display = "inline-block";
        this.placeHolder = document.createElement('div');
        this.placeHolder.style.background = 'lightgreen';
        // this.placeHolder.innerText = "加载更多";
        this.root.appendChild(this.placeHolder);

        this.root.addEventListener('scroll', event => {
            let clientRect = this.root.getBoundingClientRect();
            let placeHolderRect = this.placeHolder.getBoundingClientRect();
            /* if(clientRect.bottom < placeHolderRect.top){
                this.triggerEvent('scrollToBottom', 'aaa');
            } */
            if(this.root.scrollHeight - this.root.scrollTop <= clientRect.height + 10){
                this.triggerEvent('scrollToBottom', '没有更多了');
                
            }
            // console.log(this.root.scrollHeight, clientRect.height, this.root.scrollTop);
        })

        /* this.root.addEventListener("touchmove",function(e){ 
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive:false
        }); */
    }
    mounted(){

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
    appendChild(child){
        child.appendTo(this.root);
        this.root.appendChild(this.placeHolder);

    }

    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute('style',value);
            this.root.style.width = "100%";
            this.root.style.height = "100%";
            this.root.style.display = "inline-block";
            this.root.style.verticalAlign = "top";
            this.root.style.overflowY = 'scroll';
        }
        if(name == "data"){

        }

        if(name == "placeHolder"){
            this.placeHolder.innerText = value;
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
    triggerEvent(type, ...args){
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this, ...args);
    }
}