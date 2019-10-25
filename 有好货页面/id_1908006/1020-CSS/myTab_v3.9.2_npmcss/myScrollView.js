const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");
const EVENT_SYMBOL= Symbol("event");

export class MyScrollView {
    constructor() {
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    getAttribute(name) {
        if(name === "style") {
            return this._container.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        if(name === "style") {
            this._container.setAttribute("style", value);
        }

        // 定制placeHolderText
        if(name === "placeHolderText") {
            this.placeHolder.innerText = value;
        }

        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set;
        }

        this[EVENT_SYMBOL][type].add(listener);
    }

    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return
        }

        this[EVENT_SYMBOL][type].delete(listener);
    }

    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }


    appendTo(element) {
        element.appendChild(this._container);
        this.mounted();
    }

    appendChild(child) {
        
        this[PROPERTY_SYMBOL].children.push(child);

        child.appendTo(this._container);

        // 每次在最后都追加 placeHolder, 对于存在的元素，需要先摘下来，再追加到末尾
        // 利用这个特性，保证placeHolder永远在最后
        this._container.append(this.placeHolder);

    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    get style() {
        return this._container.style;
    }



    created() {
        this._container = document.createElement("div");
        this.placeHolder= document.createElement("div");
        //this.placeHolder.innerText = "load More";
        this.placeHolder.style.backgroundColor = "lightgreen";
        this._container.append(this.placeHolder);
        //阻止冒泡但是允许默认事件 
        //没法使用touch操作，所以需要注释掉，在tabview中使用
        /*
        this._container.addEventListener("touchmove", e=> {
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        },{
            passive: false
        });
        */

        // 每次滚动都有可能到底，必须监听scroll事件
        
        let triggered = false;
        this._container.addEventListener("scroll", event => {
            let clientRect = this._container.getBoundingClientRect();
            let placeHolderRect = this.placeHolder.getBoundingClientRect();

            if (clientRect.bottom > placeHolderRect.top) {
                    this.triggerEvent("scrollToBottom");
                }

            //console.log(clientRect.bottom, placeHolderRect.top);
            /*
            if (clientRect.bottom < placeHolderRect.top) {
                if(!triggered) {
                    this.triggerEvent("scrollToBottom");
                    triggered = true;
                }
            }
            */
            /*
            console.log(this._container.scrollTop, clientRect.height, this._container.scrollHeight);

            if (this._container.scrollHeight - this._container.scrollTop <= clientRect.height) {
                this.triggerEvent("scrollToBottom");
            }
            */
        }) 
    }


    mounted() {
      
    }



    unmounted() {

    }

    update() {

    }

}
