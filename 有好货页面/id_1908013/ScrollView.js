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
    get style () {
        return this.root.style
    }
    created(){
        this.root = document.createElement("div");
        this.placeholder = document.createElement('div')
        this.placeholder.innerText = '加载更多'
        this.placeholder.style.background = 'lightgreen'
        this.root.appendChild(this.placeholder)

        this.root.addEventListener('scroll', event => {
            let clientRect = this.root.getBoundingClientRect()
            let placeHolderRect = this.placeholder.getBoundingClientRect()
            console.log(clientRect.bottom , placeHolderRect.top)
            if (clientRect.bottom < placeHolderRect.top) {
                this.triggerEvent('scrollToBottom')
            }
            // if (this.root.scrollHeight - this.root.scrollTop <= clientRect.height) {
            //     console.log('到底了')
            //     this.triggerEvent('scrollToBottom')
            // }

        })
        this[STATE_SYMBOL].h = 0;
    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        this.children.push(child);
        child.appendTo(this.root);
        this.root.appendChild(this.placeholder)
    }

    get children(){
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name){
        if(name == "style") {
            return this.root.getAttribute("style");
        }
        if (name === 'className') {
            return this.root.getAttribute('className')
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute("style", value);
        }
        if (name === 'className') {
            this.root.setAttribute('class', value)
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
}
