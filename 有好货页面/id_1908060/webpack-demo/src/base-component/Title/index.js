const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");



const backIcon = 'http://static001.geekbang.org/univer/classes/js_dev/static/icon/back.svg';
const moreIcon = 'http://static001.geekbang.org/univer/classes/js_dev/static/icon/more.svg';
const shareIcon = 'http://static001.geekbang.org/univer/classes/js_dev/static/icon/share.svg';


// const style = `
//
// http://static001.geekbang.org/univer/classes/js_dev/static/icon/arrow-left-copy.svg
// http://static001.geekbang.org/univer/classes/js_dev/static/icon/follow.svg
// http://static001.geekbang.org/univer/classes/js_dev/static/icon/top.svg
// `;

const style = `
background: url("http://images.koolearn.com/fe_upload/2019/11/2019-11-16-1573892701765.png");
background-size: 7.5rem;
width: 7.5rem;
height: 5.08rem;
margin-bottom: -3.1rem;
`;


export default class Title {
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
        this[STATE_SYMBOL].h = 0;
    }
    mounted(){
        this.root.style = style;
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
