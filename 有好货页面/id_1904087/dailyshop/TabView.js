// save value of width
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class TabView {
    // config only once.
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null); //不建议使用 {}; 不再找原型链？ 
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.created();
        
        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
        this.root.style.display="flex";
        
        this.headerContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");
        
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.flex = "1";
        this.headerContainer.style.height = "93px";


        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
        this[STATE_SYMBOL].h = 0;

        
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

    appendChild(child) {
        this.children.push(child);

        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let tabIndex = this[PROPERTY_SYMBOL].headers.length - 1;

        let header = document.createElement("div");
        

        let highLight = document.createElement('div');
        highLight.style.width = '60px';
        highLight.style.height = '6px';
        highLight.style.borderRadius = '3px';
        highLight.style.backgroundColor = '#FFFFFF';
        tabIndex === 0 ? highLight.style.display = "block" : highLight.style.display = 'none';
        highLight.style.marginLeft = `${15 + (title.length - 2) * 10}%`;
        highLight.setAttribute('data-tab-highLight', `${tabIndex}`);

        
 
        header.innerText = title;
        header.style.display = "inline-block";
        header.style.height = "93px";
        header.style.fontFamily = "PingFang SC";
        header.style.fontSize = "46px";
        header.style.margin = "20px 35px 0 35px";

        header.appendChild(highLight);
        this.headerContainer.appendChild(header);
        
        header.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelectorAll('[data-tab-highLight]').forEach(function (elem, idx) {
                if (idx !== tabIndex) {
                    elem.style.display = 'none';
                } else {
                    elem.style.display = "block";
                }
            });
            for (let i = 0; i < this.contentContainer.children.length; i++) {
                if (i !== tabIndex) {
                    this.contentContainer.children[i].style.display = 'none';
                } else {
                    this.contentContainer.children[i].style.display = "inline-block";
                }

            }
        }, {passive: false});

        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.display = "inline-block";
        }

        
       
    }

    
    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    getAttribute(name) {
        if(name == 'style') {
            return this.root.getAttribute("style");
            
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        if(name == 'style') {
            this.root.setAttribute("style", value);
            this.root.style.display = "flex";
            this.root.style.flexDirection = "column"
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