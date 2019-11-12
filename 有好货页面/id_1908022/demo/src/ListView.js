import {create} from './create.js';
import Div from './div.js';
import css from './ListView.css';


const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

if(!window.LIST_VIEW_STYLE_ELEMENT){
    let styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    window.LIST_VIEW_STYLE_ELEMENT = true;
}

export default class ListView {
    constructor(text){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        
        this.created(text);
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    

    created(text){
        this.root = document.createElement("div");
        this.root.classList.add('list-view');
        console.log(this.render().appendTo);
        this.render().appendTo(this.root);
        
    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }

    render() {
        let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
        return <div>
            {
                data.map(item => {
                   return <div><span class="x">{item.aaa}</span><span>{item.bbb}</span></div>;
                })
            }
        </div>;
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

    }

    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute('style',value);
            this.root.style.width = "100%";
            this.root.style.height = "100%";
            this.root.style.display = "inline-block";
            this.root.style.verticalAlign = "top";
        }

        if(name == 'data'){
            this[ATTRIBUTE_SYMBOL][name] = value;
            this.root.innerHTML = '';
            this.render().appendTo(this.root);
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
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}