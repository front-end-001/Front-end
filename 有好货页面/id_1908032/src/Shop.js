const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Div {
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
        this.root.classList.add('shop-view');
        let inner = document.createElement('div')
        inner.classList.add('innner');
        let top = document.createElement('div');
        top.classList.add('top-info')
        let content = document.createElement('div');
        content.classList.add('image-box');
        inner.appendChild(top);
        inner.appendChild(content);
        // 
        let logo = document.createElement('img');
        img.src = this.logo;
        top.appendChild(logo);
        
        let rightInfo = document.createElement('div');
        rightInfo.classList('right-info');
        let title = document.createElement('div')
        title.classList.add('title')
        rightInfo.appendChild(title);
        let badage = document.createElement('div');
        badage.classList.add('badage')
        rightInfo.appendChild(badage);

        top.appendChild(rightInfo);
        // 图片列表
        for(let image of this.images){
            let img = document.createElement('img')
            img.src = image;
            content.appendChild(img);
        }
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