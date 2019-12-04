import './tab.scss';
import enableGesture from '../gesture';
import Header from './Header';
import { create } from '../create';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Tab {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        let header = <Header />
        this.root = document.createElement('div');
        this.root.classList.add('tab');
        this.contentContainer = document.createElement('div');
        this.headerContainer = document.createElement('div');
        header.appendTo(this.root);
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
        this.headerContainer.classList.add('tab-head');
        this.contentContainer.classList.add('tab-content');
        this.state = { currTab: 0 }
        enableGesture(this.contentContainer);
    }

    mounted(){

    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        this.children.push(child);
        
        let title = child.getAttribute('tab-title') || '';
        let isDefault = child.getAttribute('default');
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement('header');
        header.innerText = title;
        header.classList.add('tab-head-item');
        if(isDefault){
            header.classList.add('curr');
        }
        header.addEventListener('click', event => {
            // 处理头部样式
            for(let i = 0; i < this.headerContainer.children.length; i++){
                this.headerContainer.children[i].classList.remove('curr');
            }
            header.classList.add('curr');
            // 处理tab样式
            for(let i = 0; i < this.contentContainer.children.length; i++){
                this.contentContainer.children[i].style.display = 'none';
            }
            child.setAttribute('style', { display: 'inline-block' });

        })

        this.headerContainer.style.height = '120px';
        this.headerContainer.appendChild(header);

        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i++){
            this.contentContainer.children[i].style.width = '100%';
            this.contentContainer.children[i].style.height = '99%';
            this.contentContainer.children[i].style.display = 'inline-block';
            this.contentContainer.children[i].style.whiteSpace = 'normal';
            this.contentContainer.style.whiteSpace = 'nowrap';
            this.contentContainer.style.flex = 1;
            this.contentContainer.style.overflow = 'hidden';
        }
    }

    get state(){
        return this[STATE_SYMBOL];
    }

    set state(state){
        this[STATE_SYMBOL] = { ...this[STATE_SYMBOL], ...state };
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
            // this.root.style.whiteSpace = 'nowrap';
            this.root.style.display = 'flex';
            this.root.style.flexDirection = 'column';
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