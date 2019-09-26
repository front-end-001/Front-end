const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
import enableGesture from "./gesture";
export default class TabView {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];
        this[PROPERTY_SYMBOL].speed = 1000;
        this[PROPERTY_SYMBOL].position = 0;
        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
        this.headerContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");
        this.root.style= "width:100%; height:100%";
        this.headerContainer.style = "width:100%; overflow-x:auto; display:flex;flex-wrap:nowrap; align-items:stretch; height:50px";
        this.resetStyle();
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer)

    }
    mounted() {
        this.width = this.contentContainer.getBoundingClientRect().width;
        enableGesture(this.contentContainer);
        this.contentContainer.addEventListener("pan", event => {
            if (event.isVertical) return;
            let nextPosition = (this.position + 1) % this.children.length,
                previousPosition =
                (this.children.length + this.position - 1) % this.children.length;
            let next = this.children[nextPosition].root,
                current = this.children[this.position].root,
                previous = this.children[previousPosition].root;
            if(nextPosition == 0){
                next = ""
            }
            if(previousPosition == this.children.length - 1){
                previous = ""
            }
            if(previous){
            previous.style.transition = "ease 0s";
                previous.style.transform = `translate(${(-previousPosition - 1) *
                    this.width +
                    event.dx}px)`;
            }
        
            current.style.transition = "ease 0s";
            current.style.transform = `translate(${-this.position * this.width +
                event.dx}px)`;
            if(next){
            next.style.transition = "ease 0s";
            next.style.transform = `translate(${(1 - nextPosition) * this.width +
                event.dx}px)`;
            }
        });
        this.contentContainer.addEventListener("panend", event => {

            if (event.isVertical) return;
            let isLeft;
            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                if (event.dx > 0) {
                    this.position--;
                    isLeft = true;
                }
                if (event.dx < 0) {
                    this.position++;
                    isLeft = false;
                }
            } else {
                if (event.dx  >= this.width / 2) {
                    isLeft = true;
                    this.position--;
                } else if (event.dx < -this.width / 2) {
                    isLeft = false;
                    this.position++
                } else if (event.dx >= 0) {
                    isLeft = false;
                } else {
                    isLeft = true
                }
                //position = -Math.round((-position * width + event.dx) / width);
            }
            this.position = Math.max(0, Math.min(this.position, this.children.length - 1));
            //this.position = (this.children.length + this.position) % this.children.length;
            let nextPosition = (this.position + 1) % this.children.length,
                previousPosition =
                (this.children.length + this.position - 1) % this.children.length;
            let next = this.children[nextPosition].root,
                current = this.children[this.position].root,
                previous = this.children[previousPosition].root;
            if(nextPosition == 0){
                next = ""
            }
            if(previousPosition == this.children.length - 1){
                previous = ""
            }
            if(previous){
            if (!isLeft) {
                previous.style.transition = "ease 500ms";
            } else {
                previous.style.transition = "ease 0s";
            }
            previous.style.transform = `translate(${(-previousPosition - 1) *
                this.width}px)`;
        }

            current.style.transition = "ease 500ms";
            current.style.transform = `translate(${-this.position * this.width}px)`;
            if(next){
            if (isLeft) {
                next.style.transition = "ease 500ms";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${(1 - nextPosition) * this.width}px)`;
        }
        });
        //阻止图片默认拖拽效果
        this.contentContainer.addEventListener("mousedown", event => {
                event.preventDefault()
            }

        );
    }
    appendChild(child){
        this.children.push(child);
        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.flex = "none";
            this.contentContainer.children[i].style.display = "ease 500ms";
        }

        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);
        let header = document.createElement("div");
            header.innerHTML = title;
            header.style.margin = "15px 20px"
            header.setAttribute("data-index",this.headerContainer.children.length);
            header.addEventListener("click",(event) => {
                this.changeFrame(event.target.dataset.index)
            })
        this.headerContainer.appendChild(header);

    }
    get children() {
        return this[PROPERTY_SYMBOL].children;
    }
    set position(value) {
        this[PROPERTY_SYMBOL].position = value
    }
    get position() {
        return this[PROPERTY_SYMBOL].position
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value) {
        if(name == "class"){
            this.contentContainer.classList.add(value);
        }
        if(name == "style"){
            this.contentContainer.setAttribute("style",value);
            this.resetStyle();
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    resetStyle(){
        this.contentContainer.style.display = "flex";
        this.contentContainer.style.flexWrap = "nowrap";
        this.contentContainer.style.alignItems = "stretch";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.boxSizing = "border-box";
        this.contentContainer.style.width = "100%";
        this.contentContainer.style.height = "calc(100% - 50px)";    
    }
    changeFrame(index) {
        if(this.position == index)
            return;
        // else if(index > this.position){
        //     let next = this.children[index].root,
        //         current = this.children[this.position].root;
        //     current.style.transform = `translate(${ - this.position * this.width - this.width }px)`;
        //     next.style.transition = "ease 500ms";
        //     next.style.transform = `translate(${ - index * this.width }px)`;
        // }else if(index < this.position){

        // }
        for (let child of this.children) {
            child.root.style.transition = "ease 0s";
            child.root.style.transform = `translate(${-this.position * this.width}px)`;
        }
        setTimeout(()=> {
        for (let child of this.children) {
            child.root.style.transition = "ease 500ms";
            child.root.style.transform = `translate(${-index * this.width}px)`;
        }    
        this.position = index;
        },16)    
    }
    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type) {
        if (!this[EVENT_SYMBOL][type])
            return;
        for (let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}