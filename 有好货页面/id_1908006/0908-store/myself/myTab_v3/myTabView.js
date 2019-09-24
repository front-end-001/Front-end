const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");

export class MyTabView {
    constructor() {
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    getAttribute(name) {
        if(name == "style") {
            return this._container.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        if(name == "style") {
            this._container.setAttribute("style", value);
            this._container.style.display = "flex";
            this._container.style.flexDirection = "column";
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

        // 把header单独拿出来，作为TAB的title，不用独立设置div
        let title =  child.getAttribute("tab-title") || "default-title";

        this[PROPERTY_SYMBOL].headers.push(title);
        let header = document.createElement("div");
        header.innerText = title;
        header.style.display = "inline-block";
        header.style.height = "93px";
        header.style.fontFamily = "PingFang SC"
        header.style.fontSize = "46px";
        header.style.margin = "20px 35px 0 35px";

        this._headerContainer.appendChild(header); 


        // 把div设置成contentContainer的子元素
        child.appendTo(this._contentContainer);
        
        // set css style; 这里没法这样写，因为child 是MyDiv， 我们需要调用MyDiv的created().生成container即div 元素后，才能使用style
       // child.style.width = "100%";
       // child.style.height = "100%";
        //child.style.display = "inline-block";


        //  这里其实没有必要循环设置，唯一的好处就是怕被别的地方覆盖
        for(let i = 0; i < this._contentContainer.children.length; i ++) {
            this._contentContainer.children[i].style.width = "100%";
            this._contentContainer.children[i].style.height = "100%";
            this._contentContainer.children[i].style.display = "inline-block";
        }
        


    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }




    created() {
        this._container = document.createElement("div");

        this._container.style.display = "flex";

        this._headerContainer = document.createElement("div");
        this._contentContainer  =  document.createElement("div");

        this._contentContainer.style.whiteSpace = "nowrap";
        this._contentContainer.style.overflow = "hidden";
        this._contentContainer.style.height = "100%";
        //this._contentContainer.style.flex = "1";

        this._headerContainer.style.height = "93px";  //如果是retina要换成 186 (*2)
        
        this._container.appendChild(this._headerContainer);
        this._container.appendChild(this._contentContainer);

    }


    mounted() {
      
    }


    unmounted() {

    }

    update() {

    }

}
