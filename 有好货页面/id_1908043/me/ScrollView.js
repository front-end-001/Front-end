
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Carousel {
    constructor(){
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
        this.placeHolder= document.createElement("div");
        // this.placeHolder.innerText = "加载更多";
        this.placeHolder.style.backgroundColor = 'lightGreen';
        this.root.appendChild(this.placeHolder);

        this.root.addEventListener('scroll', event => {
            const clientRet = this.root.getBoundingClientRect()
            console.log(this.root.scrollHeight - this.root.scrollTop <= clientRet.height)
            // if (this.root.scrollHeight - this.root.scrollTop <= clientRet.height) {
            //     this.triggerEvent('scrollToBottom')
            // }

            const placeHolderRect = this.placeHolder.getBoundingClientRect()
            console.log(clientRet.bottom, placeHolderRect.top, clientRet.bottom > placeHolderRect.top)
            if (clientRet.bottom > placeHolderRect.top) {
                this.triggerEvent('scrollToBottom')
            }
        })
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
        this.root.appendChild(this.placeHolder);
    }

    get style() {
        return this.root.style;
    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
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
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if (name == 'style') {
            this.root.setAttribute('style', value)
        }
        if (name === 'placeHolderText') {
            this.placeHolder.innerText = value;
        }
        if(name === 'class') {
            this.root.setAttribute('class', value);
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