const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class ScrollView {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        

        this[PROPERTY_SYMBOL].children = [];

        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.placeHolder = document.createElement("div");
        //this.placeHolder.innerText = "加载更多";
        this.placeHolder.style.backgroundColor = "lightgreen";
        this.root.appendChild(this.placeHolder);
        /*this.root.addEventListener("touchmove",function(e){ 
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive:false
        });*/

        let triggered = false;

        this.root.addEventListener("scroll", event => {
            let clientRect = this.root.getBoundingClientRect();
            let placeHolderRect = this.placeHolder.getBoundingClientRect();
            //console.log(clientRect.bottom, )
            if(clientRect.bottom < placeHolderRect.top) {
                if(triggered) {
                    this.triggerEvent("scrolToBottom");
                    triggered = true;
                }
            }
            //console.log(this.root.scrollHeight, clientRect.height, this.root.scrollTop );
            /*if(this.root.scrollHeight - this.root.scrollTop <= clientRect.height) {
                this.triggerEvent("scrolToBottom", "b");
            }*/
        })
        this[STATE_SYMBOL].h = 0;
    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }

    get style(){
        return this.root.style;
    }

    appendChild(child){
        this.children.push(child);
        child.appendTo(this.root);
        this.root.appendChild(this.placeHolder);
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
        if(name == "placeHolderText") {
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