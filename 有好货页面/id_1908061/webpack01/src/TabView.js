import {gesture} from "./libs/gesture.js";
import css from './TabView.css';
import {create} from './create.js';


const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class TabView {
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
        this.root = document.createElement("div");
        this.root.classList.add('tab-view');

        this.topTitle = document.createElement('div');
        this.topTitle.classList.add('top-title');

        this.backIcon = document.createElement('span');
        this.backIcon.classList.add('backIcon');
        this.backImg = document.createElement('img');
        this.backImg.src = `${require('../image/backIcon25_52.png')}`;
        this.backIcon.appendChild(this.backImg);
        this.topTitle.appendChild(this.backIcon);

        this.titleIcon = document.createElement('span');
        this.titleIcon.classList.add('titleIcon');
        this.titleImg = document.createElement('img');
        this.titleImg.src = `${require('../image/titleIcon215_62.png')}`;
        this.titleIcon.appendChild(this.titleImg);
        this.topTitle.appendChild(this.titleIcon);

        this.moreIcon = document.createElement('span');
        this.moreIcon.classList.add('moreIcon');
        this.moreImg = document.createElement('img');
        this.moreImg.src = `${require('../image/moreIcon48_10.png')}`;
        this.moreIcon.appendChild(this.moreImg);
        this.topTitle.appendChild(this.moreIcon);

        this.shareIcon = document.createElement('span');
        this.shareIcon.classList.add('shareIcon');
        this.shareImg = document.createElement('img');
        this.shareImg.src = `${require('../image/shareIcon53_53.png')}`;
        this.shareIcon.appendChild(this.shareImg);
        this.topTitle.appendChild(this.shareIcon);

        this.headerContainer = document.createElement("div");
        this.headerContainer.classList.add('header-container');

        this.contentContainer = document.createElement("div");
        this.root.classList.add('content-container');
        this.contentContainer.style.height = '100%';
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.flex = "1";

        this.root.appendChild(this.topTitle);
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);

        gesture(this.contentContainer);
        this[STATE_SYMBOL].position = 0;
        this.root.addEventListener("touchmove",function(e){ 
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive:false
        });

        this.contentContainer.addEventListener("pan", event => {
            if(event.isVertical){
                return;
            }
            event.preventDefault();
            let width = this.contentContainer.getBoundingClientRect().width;

            //拉到边界回弹
            let dx = event.dx;
            if(this[STATE_SYMBOL].position == 0 && event.dx > 0){
                dx = dx / 2;
            }
            if(this[STATE_SYMBOL].position == this.contentContainer.children.length - 1 && event.dx < 0){
                dx = dx / 2;
            }

            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transition = "transform ease 0s";
                this.contentContainer.children[i].style.transform = `translateX(${ dx - width * this[STATE_SYMBOL].position}px)`;
            }
        });
        this.contentContainer.addEventListener("panend", event => {
            event.preventDefault();
            let width = this.contentContainer.getBoundingClientRect().width;
            if(event.isFlick) {
                if(event.vx > 0) {
                    this[STATE_SYMBOL].position --;
                }
                if(event.vx < 0) {
                    this[STATE_SYMBOL].position ++;
                }
            } else {
                if(event.dx > width/2) {
                    this[STATE_SYMBOL].position --;
                } 
                if(event.dx < -width/2) {
                    this[STATE_SYMBOL].position ++;
                } 
            }

            if(this[STATE_SYMBOL].position < 0){
                this[STATE_SYMBOL].position = 0;
            }
            if(this[STATE_SYMBOL].position >= this.contentContainer.children.length){
                this[STATE_SYMBOL].position = this.contentContainer.children.length - 1;
            }
                
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transition = "transform ease 0.5s";
                this.contentContainer.children[i].style.transform = `translateX(${ - width * this[STATE_SYMBOL].position}px)`;
            }
            
            for(let j = 0; j < this.headerContainer.children.length; j++ ){
                this.headerContainer.children[j].style.fontWeight = 'normal';
                this.headerContainer.children[j].children[0].style.display = 'none';   
            }    
            this.headerContainer.children[this[STATE_SYMBOL].position].style.fontWeight = 'bold';
            this.headerContainer.children[this[STATE_SYMBOL].position].children[0].style.display = 'block';     
        });
    }
    mounted(){
       
    }
    unmounted(){
    
    }
    update(){
    
    }
    appendChild(child){
        let n = this.children.length;

        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("div");
        header.innerText = title;
        header.classList.add('header');
        let line = document.createElement("div");
        line.classList.add('line');
        header.appendChild(line);
        this.headerContainer.appendChild(header);
        header.addEventListener("click", event => {
            this[STATE_SYMBOL].position = n;
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transition = "ease 0.5s";
                this.contentContainer.children[i].style.transform = `translateX(${ - n * 100 }%)`;
            }
            // Tab下划线切换
            for(let j = 0; j < this.headerContainer.children.length; j++ ){
                this.headerContainer.children[j].style.fontWeight = 'normal';
                this.headerContainer.children[j].children[0].style.display = 'none';  
            }        
            this.headerContainer.children[n].style.fontWeight = 'bold';
            this.headerContainer.children[n].children[0].style.display = 'block';        
        });

        this[PROPERTY_SYMBOL].children.push(child);
        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i++){
            this.contentContainer.children[i].style.width = '100%';
            this.contentContainer.children[i].style.height = '100%';
            this.contentContainer.children[i].style.verticalAlign = "top";
            this.contentContainer.children[i].style.display = 'inline-block';
        }
    }
    get children(){
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name){
        if(name == "style") {
            return this.root.setAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute("style", value);
            this.root.style.display = "flex";
            this.root.style.flexDirection = "column";
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