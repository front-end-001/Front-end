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
        this.currTab = 0 ;
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
        this.contentContainerInner = document.createElement('div');
        this.contentContainer.appendChild(this.contentContainerInner);
        header.appendTo(this.root);
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
        this.headerContainer.classList.add('tab-head');
        this.contentContainer.classList.add('tab-content');
        enableGesture(this.contentContainerInner);

        this.contentContainerInner.addEventListener('panstart', event => {
            this.contentContainerInner.style.transition = '';
        })

        this.contentContainerInner.addEventListener('pan', event => {
            // 横向滑动
            if(event.isHorizontal){
                // console.log(-1 * this.currTab * window.innerWidth + event.dx)
                // let dx = -1 * this.currTab * window.innerWidth;
                // if(this.currTab == 0 && event.dx > window.innerWidth / 2){
                //     dx += window.innerWidth / 2;
                // } else if(this.currTab == this.children.length - 1 && Math.abs(event.dx) > window.innerWidth / 2){
                //     dx += -(window.innerWidth / 2);
                // } else {
                //     dx = event.dx;
                // }
                let dx = -1 * this.currTab * window.innerWidth + event.dx;
                this.contentContainerInner.style.transform =  `translate(${dx}px)`;
            }
        });
        this.contentContainerInner.addEventListener('panend', event => {
            this.contentContainerInner.style.transition = 'ease 0.5s';
            if(event.isHorizontal && Math.abs(event.dx) >= window.innerWidth / 2){
                if(!((this.currTab == 0 && event.dx > 0) || (this.currTab == this.children.length - 1 && event.dx < 0))){
                    this.currTab = this.currTab + (event.dx > 0 ? -1 : 1);
                }
            } 
            // 处理头部对应的heaer
            for(let i = 0; i < this.headerContainer.children.length; i++){
                this.headerContainer.children[i].classList.remove('curr');
                if(i === this.currTab){
                    this.headerContainer.children[i].classList.add('curr');
                }
            }
            this.contentContainerInner.style.transform = `translate(${-1 * this.currTab * window.innerWidth }px)`;

        })
        // 快速滑动切换
        this.contentContainerInner.addEventListener('flick', event => {
            console.log(event);
        }) 

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
                if(event.target === this.headerContainer.children[i]){
                    this.currTab = i;
                    this.contentContainerInner.style.transform = `translate(${-i * window.innerWidth }px)`;
                }
            }
            header.classList.add('curr');
            // 处理tab样式
            // for(let i = 0; i < this.contentContainerInner.children.length; i++){
            //     // this.contentContainer.children[i].style.display = 'none';
            //     if(this.contentContainerInner.children[i] === event.target){
            //         this.contentContainerInner.style.transform = `translate(${-i * (100 /3)}%)`;
            //     }
            // }
            // child.setAttribute('style', { display: 'inline-block' });

        })

        this.headerContainer.style.height = '120px';
        this.headerContainer.appendChild(header);

        child.appendTo(this.contentContainerInner);
        for(let i = 0; i < this.contentContainerInner.children.length; i++){
            this.contentContainerInner.children[i].style.width = window.innerWidth + 'px';
            // this.contentContainer.children[i].style.height = '99%';
            // this.contentContainer.children[i].style.display = 'inline-block';
            // this.contentContainer.children[i].style.whiteSpace = 'normal';
            // this.contentContainer.style.whiteSpace = 'nowrap';
            this.contentContainerInner.style.width = `${this.contentContainerInner.children.length * 100}%`;
            this.contentContainerInner.style.display = 'flex';
            this.contentContainerInner.style.transition = 'ease 0.5s';
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