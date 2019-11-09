const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");

export class MyWrapper {
    constructor(type) {
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        // this.created(); // wrapper 不需要要这个生命周期了
        // 直接create元素即可，自带子元素，本来就是自己写的，比如<div><img></img></div>
        this._container = document.createElement(type);
    }

    getAttribute(name) {
        /*
        if(name === "style") {
            return this._container.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name];
        */
        return this._container.getAttribute(name); // 返回父容器的属性，下同
    }

    setAttribute(name, value) {
        /*
        if(name === "style") {
            this._container.setAttribute("style", value);
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
        */

        if(name === "style" && typeof value === "object") {
            for (let p in value){
                console.log(p, value[p]);
                this._container.style[p] = value[p];
            }
            return;
        }

        return this._container.setAttribute(name, value);
    }

    addEventListener(type, listener) {
        /*
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set;
        }

        this[EVENT_SYMBOL][type].add(listener);
        */
        this._container.addEventListener(...arguments);
    }

    removeEventListener(type, listener) {
        /*
        if (!this[EVENT_SYMBOL][type]) {
            return
        }

        this[EVENT_SYMBOL][type].delete(listener);
        */
        this._container.removeEventListener(...arguments);
    }

    /*
    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }
    */


    appendTo(element) {
        element.appendChild(this._container);
        //this.mounted(); // 不需要mount
    }

    appendChild(child) {
        
        this[PROPERTY_SYMBOL].children.push(child);

        
        // 把div设置成contentContainer的子元素
        child.appendTo(this._container);
       
    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }




    /* //不在需要created了
    created() {
        this._container = document.createElement("div");

    }
    */


    mounted() {
      
    }



    unmounted() {

    }

    update() {

    }

}
