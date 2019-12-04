import Div from './Div.js';
import {create} from './create.js';
// import css from './ListView.css';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

// let styleElement = document.createElement('style');
// styleElement.innerHTML = css;
// document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class ListView {
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
    // addStyle(){
    //     this.styleElement = document.createElement('style');
    //     this.styleElement.innerHTML = css;
    //     this.root.appendChild(this.styleElement);
    // }
    created(){
        this.root = document.createElement("div");
        this.root.classList.add('list-view');
        this.render().appendTo(this.root);
        // this.addStyle();
    }
    mounted(){

    }
    unmounted(){
    
    }
    update(){
    
    }

    render(){
        let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
        return <Div>
            {
                data.map( item => (
                    <div><span class = 'x y'>{item.a}</span><span>{item.b}</span></div>
                ))
            }
        </Div>;
    }
    get style(){
        return this.root.style;
    }
    appendChild(child){
        this.children.push(child);
        child.appendTo(this.root);
    }
    get children(){
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name){
        if(name == "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute("style", value);
        }
        if(name == "data") {
            this[ATTRIBUTE_SYMBOL][name] = value;
            this.root.innerHTML = '';
            this.render().appendTo(this.root);
            // this.addStyle();
            return value;
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