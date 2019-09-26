const ATTRIBUTE_SYMBOL = Symbol("attribute");

export class MyTab {
    constructor() {
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
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
        this.created();
        element.appendChild(this._container);
        this.mounted();
    }

    created() {
        this._container = document.createElement("div");
        this._container.classList.add("tab")
        this._handler = null;
        this._tabNum = this.getAttribute("number"); 
        console.log(this._tabNum);
        this._tabHeader = [];
        this._tabContent = [];
    }


    mounted() {
        for(let i = 0; i < this._tabNum;i++) {
            this._tabHeader[i] = document.createElement("div");
            this._tabHeader[i].classList.add("tab-"+i);
            this._tabHeader[i].classList.add("tab-header");
            var title = document.createTextNode("tab-"+i);
            this._tabHeader[i].appendChild(title);
            this._container.appendChild(this._tabHeader[i])
        }

        for(let i = 0; i < this._tabNum;i++) {
            this._tabContent[i] = document.createElement("div");
            this._tabContent[i].classList.add("tab-"+i);
            this._tabContent[i].classList.add("tab-content");
            var content = document.createTextNode("content-"+i);
            if(i!=0) {
                this._tabContent[i].classList.add("no-display");
            }
            this._tabContent[i].appendChild(content);
            this._container.appendChild(this._tabContent[i])
        }

        let tabHeaders = document.getElementsByClassName("tab-header");


        for(let tabHeader of tabHeaders) {
            tabHeader.addEventListener("click", () => {
                console.log("click---");
            });
        }
    }


    displayContent(elem) {

    }

    unmounted() {

    }

    update() {

    }

}
