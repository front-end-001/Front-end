import {create} from "./create.js";
import Div from "./Div.js";

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class ListView {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);


        this[PROPERTY_SYMBOL].children = [];//children需要初始化

        this.created();// 创建的时候被调用

    }
    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }
    created(){
        this.root = document.createElement("div");
        this.render().appendTo(this.root);
    }

    mounted() {
         
    }
    unmounted() {

    }
    update() {

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
    appendChild(child) {
        this.children.push(child);
        child.appendTo(this.root); // 添加过后需要 mount
        this.root.appendChild(this.placeHolder)
    }

    get children(){
        return this[PROPERTY_SYMBOL].children;
    }
    // set children(value) { // children 不能设置
    //     // console.log("property");
    //     return this[PROPERTY_SYMBOL].children = value; // return 使得和等号的语义相同
        
    // }
    getAttribute(name) {
        if(name == "style"){
            this.root.getAttribute('style');
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
            return value;
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type]){
            this[EVENT_SYMBOL][type] = new Set;
        }
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type]){
            return;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type,...args) { // 触发事件
        if(!this[EVENT_SYMBOL][type]){
           return;
        }
        for (let event of this[EVENT_SYMBOL][type]){
            event.call(this,...args);
        }
    }


}