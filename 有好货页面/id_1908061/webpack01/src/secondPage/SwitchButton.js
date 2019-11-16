import css from './SwitchButton.css';
import {create} from '../create.js';


const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class SwitchButton {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];
        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.classList.add('switch-button');
        
        this.headerContainer = document.createElement("div");
        this.headerContainer.classList.add('headers-container');
 
        this.headerLeft = document.createElement("div");
        this.headerLeft.classList.add('header-left');

        this.headerRight = document.createElement("div");
        this.headerRight.classList.add('header-right');

        this.contentContainer = document.createElement("div");
        this.contentContainer.classList.add('contents-container');
        this.contentContainer.style.width = '100%';
        this.contentContainer.style.height = '100%';
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.flex = "1";

        this.headerContainer.appendChild(this.headerLeft);
        this.headerContainer.appendChild(this.headerRight);
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
    }
    mounted(){
       
    }
    unmounted(){
    
    }
    update(){
    
    }
    appendChild(child){
        let title = child.getAttribute("tabs-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("div");
        header.innerText = title;
        header.classList.add('headers');
        this.headerRight.appendChild(header);
        header.addEventListener("click", event => {
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.display = 'none';             
            }     
            child.setAttribute('style','display:block');  
            for(let j = 0; j < this.headerRight.children.length; j++){
                this.headerRight.children[j].style.backgroundColor = "#fff";
                this.headerRight.children[j].style.color = "#ff7d31";
            } 
            event.target.style.backgroundColor = "#ff7d31";
            event.target.style.color = "#fff";
            event.target.style.borderRadius = '27px';
        });

        this[PROPERTY_SYMBOL].children.push(child);
        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i++){
            this.contentContainer.children[i].style.width = '100%';
            this.contentContainer.children[i].style.height = '100%';
            this.contentContainer.children[i].style.verticalAlign = "top";
            this.contentContainer.children[i].style.display = 'inline-block';
        }
    }
    get children(){
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name){
        if(name == "style") {
            return this.root.setAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute("style", value);
            this.root.style.display = "flex";
            this.root.style.flexDirection = "column";
        }
        if(name == "tabs-text") {
            this.headerLeft.innerText = value;

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