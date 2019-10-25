const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Scroll {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this.created();
    }
    created() {
        this.root = document.createElement("div");
        this.placeholder = document.createElement('div')
        this.placeholder.innerText = '加载更多'
        this.placeholder.style.textAlign='center'
        this.root.appendChild(this.placeholder)
        
        let trigged = false
        this.root.addEventListener('scroll',event =>{
            let clientRect = this.root.getBoundingClientRect()
            let placeholder = this.placeholder.getBoundingClientRect()
            if (clientRect.bottom > placeholder.top){
                if (trigged){
                    this.triggerEvent('scrolToBottom', 'b') 
                    trigged = true
                }
            }
            // if(this.root.scrollHeight - this.root.scrollTop <= clientRect.height){
            //    // console.log('到底啦')
            //     this.triggerEvent('scrolToBottom','b')
            // }
        })
        
    }
    mounted() {

    }
    unmounted() {

    }
    update() {

    }
    get style(){
        return this.root.style
    }
    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }
    appendChild(child) {
       // this.children.push(child)
        child.appendTo(this.root);
        this.root.appendChild(this.placeholder)
    }
    getAttribute(name) {
        if (name == "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value) {
        if (name == "style") {
            this.root.setAttribute("style", value);
        }
        if (name == "class") {
            this.root.setAttribute("class", value);
        }
        if(name == 'placeHolderText'){
            this.placeholder.innerText = value
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type, ...args) {
        
       // console.log(this[EVENT_SYMBOL][type])
        if (!this[EVENT_SYMBOL][type])
            return;
        for (let event of this[EVENT_SYMBOL][type]){
            event.call(this, ...args);
        }
    }
}