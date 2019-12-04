import {create} from "./create.js";
import Div from "./Div.js";
import css from "./ListView.css"
// save value of width
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");


// if(!window.LIST_VIEW_STYLE_ELEMENT_FLAG) {
//     window.LIST_VIEW_STYLE_ELEMENT_FLAG = true;
// }

let styleElement = document.createElement("style");
styleElement.innerHTML = css; //`@import "ListView.css"`;
//this.styleElement.scoped = true;
//styleElement.setAttribute("scoped", "");
document.getElementsByTagName("head")[0].appendChild(styleElement);



export default class ListView {
    // config only once.
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null); //不建议使用 {}; 不再找原型链？ 
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        
        this[PROPERTY_SYMBOL].children = [];

        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
        this.root.classList.add("list-view");
        this.render().appendTo(this.root);
        this.addStyle();
    }

    addStyle() {
        // this.styleElement = document.createElement("style");
        // this.styleElement.innerHTML = css; //`@import "ListView.css"`;
        // //this.styleElement.scoped = true;
        // this.styleElement.setAttribute("scoped", "");

        // this.root.appendChild(this.styleElement);
    }

    mounted() {
        // this.root.addEventListener("click", () => {
        //     //this.root.style.backgroundColor = "green";
        //     this[STATE_SYMBOL].h += 30;
        //     this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
        // });
    }

    unmounted() {

    }

    update() {

    }

    render() {
        let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
        // <div> <img style="width:30px;height:50px"></img>abc</div>;

        return <div> 
            plain hello
            {
                data.map(item => (
                    <div><span style={css.x}>{item.a}</span><span style={css.x}>{item.b}</span></div>
                ))
            }
        </div>;
    }

    get style(){
        return this.root.style;
    }

    appendChild(child) {
        this.children.push(child);
        child.appendTo(this.root);
        this.root.appendChild(this.placeHolder);
    }

    
    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    getAttribute(name) {
        if(name == "style") {
            return this.root.getAttribute("style");
        }

        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        if(name == "style") {
            this.root.setAttribute("style", value);
        }
        
        if(name == "data") {
            this[ATTRIBUTE_SYMBOL][name] = value;

            this.root.innerHTML = "";
            this.render().appendTo(this.root);
            this.addStyle();
            return value;
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    addEventListener(type, listener) {
        if(!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set();
        }
        this[EVENT_SYMBOL][type].add(listener);
    }

    removeEventListener(type, listener) {
        if(!this[EVENT_SYMBOL][type]) {
            //throw new Error("no such lisnter");
            return;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }

    triggerEvent(type) {
        for(let event of this[EVENT_SYMBOL](type) ) {
            event.call(this);
        }
    }
}