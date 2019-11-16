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

        this.bottomPlaceholder = document.createElement("div");
        this.bottomPlaceholder.style.height = "100px";
        this.bottomPlaceholder.style.width = "100%";
        //this.placeholder.style.backgroundColor = "lightgreen";

        this.bottomPlaceholder.style.textAlign = "center";

        this.topPlaceholder = document.createElement("div");
        this.topPlaceholder.style.overflow = "visible";
        this.topPlaceholder.style.width = "100%";
        this.topPlaceholder.style.textAlign = "center";
        this.topPlaceholder.style.position = "relative";

        this.topContent = document.createElement("div");
        this.topPlaceholder.appendChild(this.topContent)


        // this.topContent.style.height = "100px";
        this.topContent.style.width = "100%";
        //this.topContent.style.position = "absolute";
        // this.topContent.style.backgroundColor = "rgba(0,127,0,1)";
        this.topContent.style.zIndex = 100;
        //this.topContent.style.transform = "translateY(-50%)";

        //this.topContent.innerText = "刷新";

        this.created();

    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.style.overflow = "visible";


        this.root.addEventListener("scroll", () => {
            let rect1 = this.root.getBoundingClientRect();
            let rect2 = this.bottomPlaceholder.getBoundingClientRect();
            let rect3 = this.topPlaceholder.getBoundingClientRect();
            if(rect2.top <= rect1.bottom) {
                this.triggerEvent("scrolledToBottom")
            }
            if(rect3.top - rect1.top > 10) {
                //this.topContent.innerText = ("到顶啦！");
                this.triggerEvent("scrolledToTop")
            }
        });


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
        this.root.appendChild(this.bottomPlaceholder);
        this.root.insertBefore(this.topPlaceholder, this.root.firstChild);
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
            //this.root.style.overflow = "visible";
        }
        if(name == "bottomText") {
            this.bottomPlaceholder.innerText = value
        }
        if(name == "topText") {
            this.topContent.innerText = value
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
    triggerEvent(type, event){
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this, event);
    }
}