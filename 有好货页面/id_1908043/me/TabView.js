import enableGesture from './gesture'

const PROPERTY = Symbol("property");
const ATTRIBUTE = Symbol("attribute");
const EVENT = Symbol("event");
const STATE = Symbol("state");

export default class Tab {
    constructor(){
        this[PROPERTY] = Object.create(null);
        this[ATTRIBUTE] = Object.create(null);
        this[EVENT] = Object.create(null);
        this[STATE] = Object.create(null);

        this[PROPERTY].children = [];
        this[PROPERTY].headers = [];

        this[STATE].startTransform = 0

        this.handleGesture = this.handleGesture.bind(this);

        this.created();
        this.render();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.headerContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.height = "100%";
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
        this[STATE].h = 0;
    }
    mounted(){

    }
    render() {
        enableGesture(this.contentContainer)
        this.handleGesture()
    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        this.children.push(child);

        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY].headers.push(title);

        let header = document.createElement("header");
        header.innerText = title;
        this.headerContainer.appendChild(header);
        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.display = "inline-block";
        }

    }

    get width() {
        // TODO: getbinddingClientwidth
        return this.root.clientWidth;
    }
    get children(){
        return this[PROPERTY].children;
    }
    getAttribute(name){
        if(name == "style") {
            return this.root.getAttribute("style");
        }
        if(name === 'class') {
            return this.root.getAttribute('class');
        }
        return this[ATTRIBUTE][name]
    }
    setAttribute(name, value){
        if (name == "style") {
            this.root.setAttribute("style", value);
        }
        if (name == "class") {
            this.root.setAttribute("class", value);
        }

        return this[ATTRIBUTE][name] = value;
    }
    addEventListener(type, listener){
        if(!this[EVENT][type])
            this[EVENT][type] = new Set;
        this[EVENT][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT][type])
            return;
        this[EVENT][type].delete(listener);
    }
    triggerEvent(type){
        if(!this[EVENT][type])
            return;
        for(let event of this[EVENT][type])
            event.call(this);
    }

    handleGesture(){
        this.contentContainer.addEventListener('mousedown', event => event.preventDefault());

        this.contentContainer.addEventListener('pan', event => {
            this.update()
            console.log('pan')

            for (let child of this.children) {
                child.getDOM().style.transition = 'ease 0s'
                child.getDOM().style.transform = `translate(${this[STATE].startTransform + event.dx}px)`
            }
        })

        this.contentContainer.addEventListener('panend', event => {
            this.update()
            console.log('panend')
            this.position = - (Math.round((this[STATE].startTransform + event.dx) / this.width))

            this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

            for (let child of this.children) {
                child.getDOM().style.transition = 'ease 0.5s'
                child.getDOM().style.transform = `translate(${ - this.position * this.width}px)`
            }
            this[STATE].startTransform = - this.position * this.width;
        })

        this.contentContainer.addEventListener('flick', event => {
            this.update()
            console.log('flick', event.dx)
            if (event.dx > 0) {
                this.position = this.position - 1
            }
            if (event.dx < 0) {
                this.position = this.position + 1
            }

            this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

            for (let child of this.children) {
                child.getDOM().style.transition = 'ease 0.5s'
                child.getDOM().style.transform = `translate(${ - this.position * this.width}px)`
            }
            this[STATE].startTransform = - this.position * this.width;
        })
    }
}

