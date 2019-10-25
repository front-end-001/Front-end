import {create} from "./create.js";
import Div from "./Div.js";
import css from "./ListView.css";

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

/*
let styleElement = document.createElement("style");
styleElement.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(styleElement);
*/

export default class ListView {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        
        console.log(css);

        this[PROPERTY_SYMBOL].children = [];

        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    addStyle(){

    }

    created(){
        this.root = document.createElement("div");
        this.root.className = "list-view";
        this.render().appendTo(this.root);
    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }


    render(){
        let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
        return <div>
            hello
            {
                data.map(item => (
                    <div><span style={css.x}>{item.a}</span><span style={css.x}>{item.b}</span></div>
                ))
            }
        </div>
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
        if(name == "data") {
            this[ATTRIBUTE_SYMBOL][name] = value;

            this.root.innerHTML = "";
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
    triggerEvent(type, ...args){
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this, ...args);
    }
}